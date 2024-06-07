import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Sets } from '../entity/Sets'
import { Cards } from '../entity/Cards'
import { TestKits } from '../entity/TestKit'
import { TestQuestion } from '../entity/TestQuestion'
import { S3Service } from '../services/s3/S3Service'
import { Container } from 'typedi'
import setJson from "./json/advancedSets.json"
import { Constants } from '../core/Constant'

export class AdvancedSetSeeder implements Seeder {
    private s3Service: S3Service;

    constructor() {
        this.s3Service = Container.get(S3Service);
    }

    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {

        const setsData = setJson;

        for (const set of setsData) {
            const newSet = new Sets();
            newSet.name = set.name;
            newSet.description = set.description;
            newSet.level = set.level || Constants.LEVEL.MEDIUM

            // if (set?.image) {
            //     const image_url = await this.s3Service.uploadFile({
            //         filename: String(set.name) + '.jpg',
            //         path: set?.image,
            //         mimetype: 'image/*',
            //     });
            //     newSet.image = image_url?.Location || "";
            // }

            newSet.is_public = set.is_public;
            newSet.created_by = set.created_by;
            newSet.created_at = new Date();

            newSet.cards = [];

            for (const card of set.cards) {
                const newCard = new Cards();
                // if (card?.image) {
                //     const image_url = await this.s3Service.uploadFile({
                //         filename: String(card.term) + '.jpg',
                //         path: card?.image,
                //         mimetype: 'image/*',
                //     });
                //     newCard.image = image_url?.Location || "";
                // }
                newCard.term = card.term;
                newCard.define = card.define;
                newCard.example = JSON.stringify(card.example);
                newCard.created_by = 'flashcard.web';
                newSet.cards.push(newCard);
            }


            newSet.testKits = [];
            if (set?.testKits) {
                for (const testKit of set?.testKits) {
                    const newTestKit = new TestKits();
                    newTestKit.level = testKit.level;
                    newTestKit.questions = [];

                    if (testKit.questions.length > 0) {
                        for (const question of testKit.questions) {
                            const newQuestion = new TestQuestion();
                            newQuestion.questionText = question.questionText;
                            newQuestion.correctAnswer = question.correctAnswer;
                            newQuestion.options = question.options || [];
                            newQuestion.questionType = question.questionType;
                            newQuestion.testKit = newTestKit;  // Set the relation here
                            newQuestion.explain = question.explain || "";
                            newTestKit.questions.push(newQuestion);
                        }
                    }
                    newTestKit.set = newSet;  // Set the relation here
                    newSet.testKits.push(newTestKit);
                }
            }
            await dataSource.transaction(async manager => {
                await manager.save(newSet.cards);
                await manager.save(newSet);
                await manager.save(newSet.testKits);
                await manager.save(newSet.testKits.flatMap(testKit => testKit.questions));
            });
        }
    }
}

import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Sets } from '../entity/Sets'
import { Cards } from '../entity/Cards';
import { Questions } from '../entity/Questions'
import { S3Service } from '../services/s3/S3Service';
import { Container } from 'typedi'
import setJson from "./json/set.json"

export class SetSeeder implements Seeder {
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
            const newSet = new Sets()
            newSet.name = set.name
            newSet.description = set.description

            if (set?.image) {
                const image_url = await this.s3Service.uploadFile({
                    filename: String(set.name) + '.jpg',
                    path: set?.image,
                    mimetype: 'image/jpeg',

                });
                newSet.image = image_url?.Location || "";
            }
            newSet.is_public = set.is_public;
            newSet.created_by = set.created_by;
            newSet.created_at = new Date();

            if (!newSet.cards) {
                newSet.cards = [];
            }

            for (const card of set.cards) {
                const newCard = new Cards()
                newCard.term = card.term
                newCard.define = card.define
                newCard.example = JSON.stringify(card.example)
                newCard.created_by = card.created_by
                newSet.cards.push(newCard)
            }
            if (!newSet.questions) {
                newSet.questions = [];
            }
            if (set.questions) {
                for (const question of set.questions) {
                    const newQuestion = new Questions()
                    newQuestion.question = question.question
                    newQuestion.answers = question.answers
                    newQuestion.correct_answer = question.correct_answer
                    newQuestion.created_by = newQuestion.created_by
                    newSet.questions.push(newQuestion)
                }
            }

            await dataSource.transaction(async manager => {
                await manager.save(newSet.cards)
                await manager.save(newSet.questions)
                await manager.save(newSet)
            })
        }
    }
}
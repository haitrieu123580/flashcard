import { Container } from 'typedi';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Constants } from '../core/Constant';
import { Cards } from '../entity/Cards';
import { Sets } from '../entity/Sets';
import { TestKits } from '../entity/TestKit';
import { TestQuestion } from '../entity/TestQuestion';
import { FirebaseUpload } from '../services/upload/FirebaseUpload';
import { IUploadService } from '../services/upload/IUploadService';
import setJson from './json/advancedSets.json';

export class AdvancedSetSeeder implements Seeder {
  private uploadService: IUploadService;
  constructor() {
    this.uploadService = Container.get(FirebaseUpload);
  }

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const setsData = setJson;

    for (const set of setsData) {
      const newSet = new Sets();
      newSet.name = set.name;
      newSet.description = set.description;
      newSet.level = set.level || Constants.LEVEL.MEDIUM;

      if (set?.image) {
        // const image_url = await this.s3Service.uploadFile({
        //   filename: String(set.name) + '.jpg',
        //   path: set?.image,
        //   mimetype: 'image/*',
        // });
        // newSet.image = image_url?.Location || "";
        const image_uploaded = await this.uploadService.uploadImage({
          originalname: String(set.name) + `${Date.now()}`,
          path: set?.image,
          mimetype: 'image/*',
        });
        const image_url = image_uploaded;
        newSet.image = image_url;
      }

      newSet.is_public = set.is_public;
      newSet.created_by = 'flashcard.web';
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
              newQuestion.testKit = newTestKit; // Set the relation here
              newQuestion.explain = question.explain || '';
              newTestKit.questions.push(newQuestion);
            }
          }
          newTestKit.set = newSet; // Set the relation here
          newSet.testKits.push(newTestKit);
        }
      }
      await dataSource.transaction(async (manager) => {
        await manager.save(newSet.cards);
        await manager.save(newSet);
        await manager.save(newSet.testKits);
        await manager.save(
          newSet.testKits.flatMap((testKit) => testKit.questions),
        );
      });
    }
  }
}

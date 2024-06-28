import Container, { Service } from 'typedi';
import { BadRequestError, NotFoundError } from '@src/core/ApiError';
import { Constants } from '@src/core/Constant';
import { AppDataSource } from '@src/data-source';
import { Sets } from '@src/entity/Sets';
import { TestKits } from '@src/entity/TestKit';
import { TestQuestion } from '@src/entity/TestQuestion';
import { User } from '@src/entity/User';
import { FirebaseUpload } from '@services/upload/FirebaseUpload';
import {IUploadService} from "@services/upload/IUploadService";

@Service()
export class TestKitService {
  private userRepo;
  private setRepo;
  private testQuestionRepo;
  private testKitsRepo;
  private uploadService: IUploadService;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.setRepo = AppDataSource.getRepository(Sets);
    this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
    this.testKitsRepo = AppDataSource.getRepository(TestKits);
    this.uploadService = Container.get(FirebaseUpload);

  }

  createTestKit = async (data: any): Promise<any> => {
    const { user, setId, level } = data;
    if (!user || !setId || !level) {
      throw new BadRequestError('Invalid data');
    }
    const set = await this.setRepo.findOne({
      where: {
        id: setId,
      },
    });
    if (!set) {
      throw new NotFoundError('Set not found');
    }
    const testKit = new TestKits();
    testKit.level = level;
    testKit.set = set;
    return await this.testKitsRepo.save(testKit);
  };

  getTestKit = async (data: any): Promise<any> => {};

  getAllTestKits = async (data: any): Promise<any> => {
    const { user, setId } = data;
    if (!user || !setId) {
      throw new BadRequestError('Invalid data');
    }
    const set = await this.setRepo.findOne({
      where: {
        id: setId,
      },
    });
    if (!set) {
      throw new NotFoundError('Set not found');
    }
    const [testKits, count] = await this.testKitsRepo.findAndCount({
      where: {
        set: {
          id: set.id,
        },
      },
      relations: ['questions'],
    });
    testKits.forEach(async (kit: any) => {
      const [questions, count] = await this.testQuestionRepo.findAndCount({
        where: {
          test: {
            id: kit.id,
          },
        },
      });
      return {
        ...kit,
        questions: questions,
      };
    });
    return { testKits, count };
  };

  updateTestKit = async (data: any): Promise<any> => {};

  deleteTestKit = async (data: any): Promise<any> => {};

  addQuestion = async (data: any): Promise<any> => {
    const { user, testKitId, question } = data;
    if (!user || !testKitId || !question) {
      throw new BadRequestError('Invalid data');
    }
    const testKit = await this.testKitsRepo.findOne({
      where: {
        id: testKitId,
      },
    });
    if (!testKit) {
      throw new BadRequestError('Test kit not found');
    }
    const testQuestion = new TestQuestion();
    if (question.questionImage) {
      const image = await this.uploadService.uploadImage(question.questionImage);
      testQuestion.questionText = image || '';
    } else {
      testQuestion.questionText = question.questionText;
    }
    if (typeof question.options === 'string') {
      question.options = JSON.parse(question.options);
    }
    testQuestion.options = question.options || [];
    testQuestion.correctAnswer = question.correctAnswer;
    testQuestion.questionType = question.questionType;
    testQuestion.explain = question.explain;
    testQuestion.testKit = testKit;
    await this.testQuestionRepo.save(testQuestion);
    return testQuestion;
  };

  updateQuestion = async (data: any): Promise<any> => {
    const { user, testKitId, questionId, question } = data;
    if (!user || !testKitId || !questionId || !question) {
      throw new BadRequestError('Invalid data');
    }

    const testQuestion = await this.testQuestionRepo.findOne({
      where: {
        id: questionId,
      },
    });
    if (!testQuestion) {
      throw new BadRequestError('Question not found');
    }
    if (
      question.questionImage &&
      question.questionType === Constants.QUESTION_TYPE.IMAGE
    ) {
      const image = await this.uploadService.uploadImage(question.questionImage);
      testQuestion.questionText = image;
    } else {
      testQuestion.questionText = question.questionText;
    }
    if (typeof question.options === 'string') {
      question.options = JSON.parse(question.options);
    }
    testQuestion.correctAnswer = question.correctAnswer;
    testQuestion.questionType = question.questionType;
    testQuestion.explain = question.explain;
    testQuestion.updated_at = new Date();
    await this.testQuestionRepo.save(testQuestion);
    return testQuestion;
  };

  deleteQuestion = async (data: any): Promise<any> => {
    const { user, questionId } = data;
    if (!user || !questionId) {
      throw new BadRequestError('Invalid data');
    }

    const testQuestion = await this.testQuestionRepo.findOne({
      where: {
        id: questionId,
      },
    });
    if (!testQuestion) {
      throw new BadRequestError('Question not found');
    }
    await this.testQuestionRepo.remove(testQuestion);
    return true;
  };
}

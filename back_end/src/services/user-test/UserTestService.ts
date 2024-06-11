import { Cards } from '@entity/Cards';
import { TestQuestion } from '@entity/TestQuestion';
import { Tests } from '@entity/Tests';
import { UserProgress } from '@entity/UserProgress';
import { Service } from 'typedi';
import { IsNull, Not } from 'typeorm';
import {
  ApiError,
  AuthFailureError,
  BadRequestError,
  ErrorType,
  ForbiddenError,
  InternalError,
  NoDataError,
  NotFoundError,
} from '@src/core/ApiError';
import { Constants } from '@src/core/Constant';
import { Sets } from '@src/entity/Sets';
import { TestResultDetails } from '@src/entity/TestResultDetails';
import { User } from '@src/entity/User';

import { AppDataSource } from '../../data-source';

@Service()
export class UserTestService {
  private userRepo;
  private setRepo;
  private cardRepo;
  private testRepo;
  private testQuestionRepo;
  private testResultRepo;
  private userProgressRepo;
  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.setRepo = AppDataSource.getRepository(Sets);
    this.cardRepo = AppDataSource.getRepository(Cards);
    this.testRepo = AppDataSource.getRepository(Tests);
    this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
    this.testResultRepo = AppDataSource.getRepository(TestResultDetails);
    this.userProgressRepo = AppDataSource.getRepository(UserProgress);
  }

  saveTestResult = async (
    userId: string,
    testId: string,
    answers: { questionId: string; answer: string }[],
  ): Promise<any> => {
    if (!userId || !testId || !answers)
      throw new BadRequestError('User id, Test id or Answers are not provided');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new AuthFailureError('User not found');

    const test = await this.testRepo.findOneOrFail({
      where: { id: testId },
      relations: ['questions', 'set', 'set.cards'],
    });
    if (!test) throw new NoDataError('Test not found');

    let score = 0;
    let updatedResultsDetails: TestResultDetails[] = [];

    for (const question of test.questions) {
      const userAnswer = answers.find(
        (answer) => answer.questionId === question.id,
      );
      const existedResult = await this.testResultRepo.findOne({
        where: { question: { id: question.id }, test: { id: test.id } },
      });

      let testResult;
      if (existedResult) {
        testResult = existedResult;
      } else {
        testResult = new TestResultDetails();
      }

      if (!userAnswer) {
        testResult.isCorrect = false;
        testResult.userAnswer = '';
      } else {
        testResult.isCorrect = userAnswer.answer
          ? question.correctAnswer.toLowerCase() ===
            userAnswer.answer.toLowerCase()
          : false;
        testResult.userAnswer = userAnswer.answer;
        score += testResult.isCorrect ? 1 : 0;
      }

      testResult.question = question;
      testResult.test = test;
      updatedResultsDetails.push(testResult);
      await this.testResultRepo.save(testResult);
    }

    test.score = score;
    test.completedAt = new Date();

    await AppDataSource.transaction(async (manager) => {
      await manager.save(test);
    });

    return {
      ...test,
      set: {
        ...test.set,
        mySet: test.set?.user?.id === userId,
      },
      totalQuestions: test.questions.length,
    };
  };

  getUserRecentTestOfSet = async (
    userId: string,
    setId: string,
  ): Promise<any> => {
    if (!userId || !setId)
      throw new BadRequestError('User id or Set id is not provided');
    const user = await this.userRepo.findOneOrFail({
      where: {
        id: userId,
      },
    });
    if (!user) throw new AuthFailureError('User not found');
    const set = await this.setRepo.findOneOrFail({
      where: {
        id: setId,
      },
    });
    if (!set) throw new NoDataError('Set not found');
    const [tests, testCount] = await this.testRepo.findAndCount({
      where: {
        user: { id: user.id },
        set: { id: set.id },
        completedAt: Not(IsNull()),
        score: Not(IsNull()),
        // level: Not(Constants.LEVEL.BEGINER)
      },
      order: {
        completedAt: 'DESC', // latest test first
      },
      // take: ,
      relations: ['questions', 'results'],
    });

    let totalCorrectPercent = 0;
    let completedTests = 0;
    tests.forEach((test: Tests) => {
      if (test.questions.length === 0) {
        return;
      }
      const correctAnswers = test.results.filter(
        (result: TestResultDetails) => result.isCorrect,
      );
      const correctPercent =
        (correctAnswers.length / test.questions.length) * 100;
      totalCorrectPercent += correctPercent;
      completedTests++;
    });

    return {
      tests: tests.map((test: Tests) => {
        return {
          ...test,
          questions: test.questions.length,
        };
      }),
      count: testCount,
      totalCorrectPercent: Math.round(
        completedTests > 0 ? totalCorrectPercent / completedTests : 0,
      ),
    };
  };

  getUserTestResult = async (userId: string, testId: string): Promise<any> => {
    if (!userId || !testId)
      throw new BadRequestError('User id or Test id is not provided');
    const user = await this.userRepo.findOneOrFail({
      where: {
        id: userId,
      },
    });
    if (!user) throw new AuthFailureError('User not found');
    const test = await this.testRepo.findOneOrFail({
      where: {
        id: testId,
        user: { id: user.id },
      },
      relations: [
        'questions',
        'set',
        'results',
        'results.question',
        'set.user',
      ],
    });
    if (!test) throw new NoDataError('Test not found');
    return {
      ...test,
      set: {
        ...test.set,
        mySet: test.set?.user?.id === userId,
      },
      totalQuestions: test.questions.length,
    };
  };
}

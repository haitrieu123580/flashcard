import { Service } from "typedi";
import { AppDataSource } from "../../data-source"
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
    BadRequestError,
    AuthFailureError,
    ForbiddenError,
    NoDataError,
} from '@src/core/ApiError';
import { TestResult } from '@entity/TestResult';
import { TestQuestion } from '@entity/TestQuestion';
import { Tests } from '@entity/Tests';
import { UserProgress } from '@entity/UserProgress';
import { Cards } from '@entity/Cards';
import { User } from "@src/entity/User";
import { Sets } from "@src/entity/Sets";
import { IsNull, Not } from "typeorm";
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
        this.testResultRepo = AppDataSource.getRepository(TestResult);
        this.userProgressRepo = AppDataSource.getRepository(UserProgress);
    }

    saveTestResult = async (userId: string, testId: string, answers: { questionId: string, answer: string }[]): Promise<any> => {
        if (!userId || !testId || !answers) throw new BadRequestError('User id, Test id or Answers are not provided');
        const user = await this.userRepo.findOne(
            {
                where: {
                    id: userId
                }
            }
        );
        if (!user) throw new AuthFailureError('User not found');
        const test = await this.testRepo.findOneOrFail({
            where: {
                id: testId
            },
            relations: ['questions', 'set', 'set.cards']
        });
        if (!test) throw new NoDataError('Test not found');

        let score = 0;
        let updatedQuestions: TestQuestion[] = [];
        for (const answer of answers) {
            const question = await this.testQuestionRepo.findOne({
                where: {
                    id: answer.questionId
                }
            });

            if (!question) continue;
            question.isCorrect = question.correctAnswer == answer.answer;
            question.userAnswer = answer.answer;
            score += question.isCorrect ? 1 : 0;
            updatedQuestions.push(question);
            // await this.testQuestionRepo.save(question);
            // score += question.correctAnswer == answer.answer ? 1 : 0;
        }
        test.score = score;
        test.completedAt = new Date();

        // const response = await this.testRepo.save(test);
        await AppDataSource.transaction(async manager => {
            await manager.save(test);
            await manager.save(updatedQuestions);
        });
        return {
            ...test,
            totalQuestions: test.questions.length,
        }
    }

    getUserRecentTestOfSet = async (userId: string, setId: string): Promise<any> => {
        if (!userId || !setId) throw new BadRequestError('User id or Set id is not provided');
        const user = await this.userRepo.findOneOrFail(
            {
                where: {
                    id: userId
                }
            }
        );
        if (!user) throw new AuthFailureError('User not found');
        const set = await this.setRepo.findOneOrFail({
            where: {
                id: setId
            }
        });
        if (!set) throw new NoDataError('Set not found');
        const [tests, testCount] = await this.testRepo.findAndCount({
            where: {
                user: { id: user.id },
                set: { id: set.id },
                completedAt: Not(IsNull())
            },
            order: {
                completedAt: 'DESC' // latest test first
            },
            take: 5,
            relations: ['questions']
        });
        return {
            tests: tests.map((test: Tests) => {
                return {
                    ...test,
                    questions: test.questions.length
                }
            }),
            count: testCount
        };
    }

    getUserTestResult = async (userId: string, testId: string): Promise<any> => {
        if (!userId || !testId) throw new BadRequestError('User id or Test id is not provided');
        const user = await this.userRepo.findOneOrFail(
            {
                where: {
                    id: userId
                }
            }
        );
        if (!user) throw new AuthFailureError('User not found');
        const test = await this.testRepo.findOneOrFail({
            where: {
                id: testId,
                user: { id: user.id }
            },
            relations: ['questions', "set"]
        });
        if (!test) throw new NoDataError('Test not found');
        return {
            ...test,
            totalQuestions: test.questions.length
        };
    }
}
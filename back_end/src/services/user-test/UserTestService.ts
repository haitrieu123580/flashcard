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
        for (const answer of answers) {
            const question = await this.testQuestionRepo.findOne({
                where: {
                    id: answer.questionId
                }
            });

            if (!question) continue;
            question.isCorrect = question.correctAnswer == answer.answer;
            score += question.isCorrect ? 1 : 0;
            await this.testQuestionRepo.save(question);
            // score += question.correctAnswer == answer.answer ? 1 : 0;
        }
        test.score = score;
        test.completedAt = new Date();
        // const userProgress = await this.userProgressRepo.findOne({
        //     where: {
        //         user: { id: user.id },
        //         set: { id: test.set.id }
        //     }
        // });
        // if (!userProgress) {
        //     const newUserProgress = new UserProgress();
        //     newUserProgress.user = user;
        //     newUserProgress.set = test.set;
        //     newUserProgress.progress = score;
        //     newUserProgress.totalCards = test.set.cards.length;
        //     newUserProgress.totalLearnedCards = score;
        //     await this.userProgressRepo.save(newUserProgress);
        // } else {
        //     userProgress.progress = userProgress.progress + score;
        //     userProgress.totalLearnedCards = userProgress.totalLearnedCards + score;
        //     userProgress.totalCards = test.set.cards.length;
        //     await this.userProgressRepo.save(userProgress);
        // }
        const response = await this.testRepo.save(test);
        return {
            ...response,
            // userProgress: {
            //     totalLearnCards: userProgress?.totalLearnedCards || score,
            //     totalCards: test.set.cards.length,
            // }
        }
    }

    // getUserProgress = async (userId: string): Promise<any> => {
    //     const user = await this.userRepo.findOne({
    //         where: {
    //             id: userId
    //         }
    //     });
    //     if (!user) throw new AuthFailureError('User not found');
    //     const userProgress = await this.userProgressRepo.find({
    //         where: {
    //             user: { id: user.id }
    //         },
    //         relations: ['set']
    //     });
    //     return userProgress;
    // }
}
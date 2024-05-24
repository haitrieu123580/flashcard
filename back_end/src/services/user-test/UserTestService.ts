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
import { TestResultDetail } from "@entity/TestResultDetail";
@Service()
export class UserTestService {
    private userRepo;
    private setRepo;
    private cardRepo;
    private testRepo;
    private testQuestionRepo;
    private testResultDetailRepo;
    private testResultRepo;
    private userProgressRepo;
    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.setRepo = AppDataSource.getRepository(Sets);
        this.cardRepo = AppDataSource.getRepository(Cards);
        this.testRepo = AppDataSource.getRepository(Tests);
        this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
        this.testResultDetailRepo = AppDataSource.getRepository(TestResultDetail);
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
        const test = await this.testRepo.findOne({
            where: {
                id: testId
            },
            relations: ['questions', 'set']
        });


        if (!user || !test) throw new Error('User or Test not found');

        const testResult = new TestResult();
        testResult.user = user;
        testResult.test = test;
        testResult.score = 0;
        testResult.details = [];

        const correctCardIds = new Set<string>();

        for (const answer of answers) {
            const question = await this.testQuestionRepo.findOne({
                where: {
                    id: answer.questionId
                }
            })
            if (!question) continue;

            const isCorrect = question.correctAnswer === answer.answer;

            const detail = new TestResultDetail();
            detail.testResult = testResult;
            detail.question = question;
            detail.isCorrect = isCorrect;
            await this.testResultDetailRepo.save(detail);
            testResult.details.push(detail);

            if (isCorrect) {
                correctCardIds.add(question.card.id);
                testResult.score++;
            }
        }

        await this.testResultRepo.save(testResult);

        const flashcardSet = test.set;
        const totalCards = flashcardSet.cards.length;

        const correctCardsCount = await this.testResultDetailRepo
            .createQueryBuilder('detail')
            .leftJoin('detail.testResult', 'testResult')
            .leftJoin('testResult.tests', 'tests')
            .leftJoin('test.sets', 'sets')
            .where('testResult.userId = :userId', { userId })
            .andWhere('flashcardSet.id = :setId', { setId: flashcardSet.id })
            .andWhere('detail.isCorrect = true')
            .select('detail.questionId')
            .distinct(true)
            .getCount();

        const progress = (correctCardsCount / totalCards) * 100;

        let userProgress = await this.userProgressRepo.findOne({
            where: {
                user: user,
                set: flashcardSet
            }
        });
        if (!userProgress) {
            userProgress = new UserProgress();
            userProgress.user = user;
            userProgress.set = flashcardSet;
        }
        userProgress.progress = progress;

        await this.userProgressRepo.save(userProgress);
        return testResult;
    }


    // async function getUserProgress(userId: number) {
    //     const flashcardSetRepository = getRepository(FlashcardSet);
    //     const testResultDetailRepository = getRepository(TestResultDetail);

    //     // Lấy tất cả bộ flashcard mà người dùng đã học
    //     const flashcardSets = await flashcardSetRepository
    //         .createQueryBuilder('flashcardSet')
    //         .leftJoinAndSelect('flashcardSet.flashcards', 'flashcard')
    //         .leftJoin('flashcardSet.tests', 'test')
    //         .leftJoin('test.results', 'testResult')
    //         .where('testResult.userId = :userId', { userId })
    //         .getMany();

    //     // Tạo danh sách tiến độ học
    //     const progressList = [];
    //     for (const flashcardSet of flashcardSets) {
    //         const totalCards = flashcardSet.flashcards.length;

    //         const correctCards = await testResultDetailRepository
    //             .createQueryBuilder('detail')
    //             .leftJoin('detail.testResult', 'testResult')
    //             .leftJoin('testResult.test', 'test')
    //             .leftJoin('test.flashcardSet', 'flashcardSet')
    //             .where('testResult.userId = :userId', { userId })
    //             .andWhere('flashcardSet.id = :setId', { setId: flashcardSet.id })
    //             .andWhere('detail.isCorrect = true')
    //             .select('detail.questionId')
    //             .distinct(true)
    //             .getCount();

    //         const progress = (correctCards / totalCards) * 100;
    //         progressList.push({
    //             setId: flashcardSet.id,
    //             setTitle: flashcardSet.title,
    //             progress,
    //         });
    //     }

    //     return progressList;
    // }

}
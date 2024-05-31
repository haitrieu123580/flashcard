import Container, { Service } from "typedi";
import { AppDataSource } from "@src/data-source";
import { TestKits } from "@src/entity/TestKit";
import { TestQuestion } from "@src/entity/TestQuestion";
import { Sets } from "@src/entity/Sets";
import { User } from "@src/entity/User";
import { BadRequestError, NotFoundError } from "@src/core/ApiError";
import { S3Service } from "../s3/S3Service";
import { Constants } from "@src/core/Constant";



@Service()
export class TestKitService {
    private userRepo;
    private setRepo;
    private testQuestionRepo;
    private testKitsRepo;
    private s3Service: S3Service;
    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.setRepo = AppDataSource.getRepository(Sets);
        this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
        this.testKitsRepo = AppDataSource.getRepository(TestKits);
        this.s3Service = Container.get(S3Service);

    }

    createTestKit = async (data: any): Promise<any> => {
        const { user, setId, level } = data;
        if (!user || !setId || !level) {
            throw new BadRequestError("Invalid data");
        }
        const set = await this.setRepo.findOne({
            where: {
                id: setId
            }
        });
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        const testKit = new TestKits();
        testKit.level = level;
        testKit.set = set;
        return await this.testKitsRepo.save(testKit);
    }

    getTestKit = async (data: any): Promise<any> => {
    }

    getAllTestKits = async (data: any): Promise<any> => {
        const { user, setId } = data;
        if (!user || !setId) {
            throw new BadRequestError("Invalid data");
        }
        const set = await this.setRepo.findOne({
            where: {
                id: setId
            }
        });
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        const [testKits, count] = await this.testKitsRepo.findAndCount({
            where: {
                set: {
                    id: set.id
                }
            },
            relations: ["questions"]
        });
        testKits.forEach(async (kit: any) => {
            const [questions, count] = await this.testQuestionRepo.findAndCount({
                where: {
                    test: {
                        id: kit.id
                    }
                }
            })
            return {
                ...kit,
                questions: questions
            }

        })
        return { testKits, count };
    }

    updateTestKit = async (data: any): Promise<any> => {

    }

    deleteTestKit = async (data: any): Promise<any> => {

    }

    addQuestion = async (data: any): Promise<any> => {
        const { user, testKitId, question } = data;
        if (!user || !testKitId || !question) {
            throw new BadRequestError("Invalid data");
        }
        const testKit = await this.testKitsRepo.findOne({
            where: {
                id: testKitId
            }
        });
        if (!testKit) {
            throw new BadRequestError("Test kit not found");
        }
        const testQuestion = new TestQuestion();
        if (question.questionImage) {
            const image = await this.s3Service.uploadFile(question.questionImage);
            testQuestion.questionText = image?.Location || "";
        }
        else {
            testQuestion.questionText = question.questionText;
        }
        if (typeof question.options === "string") {
            question.options = JSON.parse(question.options);
        }
        testQuestion.options = question.options || [];
        testQuestion.correctAnswer = question.correctAnswer;
        testQuestion.questionType = question.questionType;
        testQuestion.testKit = testKit;
        await this.testQuestionRepo.save(testQuestion);
        return testQuestion;
    }

    updateQuestion = async (data: any): Promise<any> => {
        const { user, testKitId, questionId, question } = data;
        if (!user || !testKitId || !questionId || !question) {
            throw new BadRequestError("Invalid data");
        }

        const testQuestion = await this.testQuestionRepo.findOne({
            where: {
                id: questionId
            }
        });
        if (!testQuestion) {
            throw new BadRequestError("Question not found");
        }
        if (question.questionImage && question.questionType === Constants.QUESTION_TYPE.IMAGE) {
            const image = await this.s3Service.uploadFile(question.questionImage);
            testQuestion.questionText = image.Location;
        }
        else {
            testQuestion.questionText = question.questionText;
        }
        if (typeof question.options === "string") {
            question.options = JSON.parse(question.options);
        }
        testQuestion.correctAnswer = question.correctAnswer;
        testQuestion.questionType = question.questionType;
        testQuestion.updated_at = new Date();
        await this.testQuestionRepo.save(testQuestion);
        return testQuestion;
    }

    deleteQuestion = async (data: any): Promise<any> => {
        const { user, questionId } = data;
        if (!user || !questionId) {
            throw new BadRequestError("Invalid data");
        }

        const testQuestion = await this.testQuestionRepo.findOne({
            where: {
                id: questionId
            }
        });
        if (!testQuestion) {
            throw new BadRequestError("Question not found");
        }
        await this.testQuestionRepo.remove(testQuestion);
        return true;
    }

}
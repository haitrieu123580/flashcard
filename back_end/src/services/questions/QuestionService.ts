import { Request, Response } from "express";
import { IQuestionService } from "./IQuestionService";
import {
    SuccessMsgResponse,
    SuccessResponse,
    FailureMsgResponse,
    FailureResponse
} from "@src/core/ApiResponse";
import { Container, Service } from 'typedi';
import { IQuestionRepo } from "@repositories/question/IQuestionRepo";
import { QuestionRepo } from "@repositories/question/QuestionRepo";
import { IVocabularySetRepo } from "@repositories/vocabulary-set/IVocabularySetRepo";
import { VocabularySetRepo } from "@src/repositories/vocabulary-set/VocabularySetRepo";

@Service()
export class QuestionService implements IQuestionService {
    private questionRepo: IQuestionRepo;
    private setRepo: IVocabularySetRepo;

    constructor() {
        this.questionRepo = Container.get(QuestionRepo);
        this.setRepo = Container.get(VocabularySetRepo);
    }
    async GetQuestionList(req: Request, res: any): Promise<any> {
        try {
            const setId = req.params.setId;
            const isExistSet = await this.setRepo.isExistSet(setId);
            if (!isExistSet) {
                return new FailureMsgResponse("Set not found").send(res);
            }
            const [questionList, count] = await this.questionRepo.GetQuestionList(setId);
            if (count) {
                return new SuccessResponse("Question list", {
                    count,
                    questionList
                }).send(res);
            }
            return new FailureMsgResponse("Question list not found").send(res);
        } catch (error) {

        }
    }

    async GetQuestion(req: any, res: any): Promise<any> {
        try {
            const questionId = req.params.id;
            const isExistQuestion = await this.questionRepo.isExistQuestion(questionId);
            if (!isExistQuestion) {
                return new FailureMsgResponse("Question not found").send(res);
            }
            const question = await this.questionRepo.GetQuestion(questionId);
            if (question) {
                return new SuccessResponse("Question", question).send(res);
            }
            return new FailureMsgResponse("Question not found").send(res);
        } catch (error) {

        }
    }

    async CreateQuestion(req: any, res: any): Promise<any> {
        try {
            const setId = req.body.set_id;
            const isExistSet = await this.setRepo.isExistSet(setId);
            if (!isExistSet) {
                return new FailureMsgResponse("Set not found").send(res);
            }
            const questionData = {
                question: req.body?.question,
                answers: req.body?.answers,
                correct_answer: req.body?.correct_answer,
                set_id: setId
            }
            const isCreated = await this.questionRepo.CreateQuestion(questionData);
            if (isCreated) {
                return new SuccessMsgResponse("Question created successfully").send(res);
            }
            return new FailureMsgResponse("Question created failed").send(res);
        } catch (error) {
            return new FailureMsgResponse("Internal Server Error").send(res);
        }
    }

    async UpdateQuestion(req: Request, res: Response): Promise<any> {
        try {
            const questionId = req.params.id;
            const isExistQuestion = await this.questionRepo.isExistQuestion(questionId);
            if (!isExistQuestion) {
                return new FailureMsgResponse("Question not found").send(res);
            }
            const questionData = {
                question: req.body.question,
                answers: req.body.answers,
                correct_answer: req.body.correct_answer,
            }
            const isUpdated = await this.questionRepo.UpdateQuestion(questionId, questionData);
            if (isUpdated) {
                return new SuccessMsgResponse("Question updated successfully").send(res);
            }
            return new FailureMsgResponse("Question updated failed").send(res);
        } catch (error) {
            console.log("error", error);
            return new FailureMsgResponse("Internal Server Error").send(res);
        }
    }

    async DeleteQuestion(req: any, res: any): Promise<any> {
        try {
            const questionId = req.params.id;
            const isExistQuestion = await this.questionRepo.isExistQuestion(questionId);
            if (!isExistQuestion) {
                return new FailureMsgResponse("Question not found").send(res);
            }
            const isDeleted = await this.questionRepo.DeleteQuestion(questionId);
            if (isDeleted) {
                return new SuccessMsgResponse("Question deleted successfully").send(res);
            }
            return new FailureMsgResponse("Question deleted failed").send(res);
        } catch (error) {

        }
    }

}
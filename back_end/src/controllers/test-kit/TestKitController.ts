import { Container } from "typedi";
import { Request, Response } from "express";
import { TestKitService } from "@src/services/test-kit/TestKitService";
import { FailureMsgResponse, SuccessMsgResponse, SuccessResponse } from "@src/core/ApiResponse";
export class TestKitController {

    private testKitService: TestKitService;
    constructor() {
        this.testKitService = Container.get(TestKitService);
    }

    createTestKit = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            setId: req.body.setId,
            level: req.body.level,

        }
        const response = await this.testKitService.createTestKit(data);
        if (response) {
            return new SuccessMsgResponse("Create test kit successfully!").send(res);
        }
        return new FailureMsgResponse("Create test kit failed!").send(res);
    }

    getTestKit = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            testKitId: req.params.testKitId,
        }
    }

    getAllTestKits = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            setId: req.params.setId,
        }
        const response = await this.testKitService.getAllTestKits(data);
        if (response) {
            return new SuccessResponse("Get all test kits successfully!", response).send(res);
        }
        return new FailureMsgResponse("Get all test kits failed!").send(res);
    }

    updateTestKit = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            testKitId: req.params.testKitId,
            question: {
                id: req.params.questionId,
                questionText: req.body.questionText,
                options: req.body.options,
                correctAnswer: req.body.correctAnswer,
                questionType: req.body.questionType,
                explain: req.body.explain,
                questionImage: req.file,
            }
        }
        const response = await this.testKitService.updateQuestion(data);
        if (response) {
            return new SuccessMsgResponse("Update question successfully!").send(res);
        }
        return new FailureMsgResponse("Update question failed!").send(res);
    }

    deleteTestKit = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            testKitId: req.params.testKitId,
        }
    }

    addQuestion = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            testKitId: req.params.testKitId,
            question: {
                questionText: req.body.questionText,
                options: req.body.options,
                correctAnswer: req.body.correctAnswer,
                questionType: req.body.questionType,
                questionImage: req.file,
                explain: req.body.explain,
            }
        }
        const response = await this.testKitService.addQuestion(data);
        if (response) {
            return new SuccessMsgResponse("Add question successfully!").send(res);
        }
        return new FailureMsgResponse("Add question failed!").send(res);
    }

    updateQuestion = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            testKitId: req.params.testKitId,
            questionId: req.params.questionId,
            question: {
                questionText: req.body.questionText,
                options: req.body.options,
                correctAnswer: req.body.correctAnswer,
                questionType: req.body.questionType,
                questionImage: req.file,
            }
        }
        const response = await this.testKitService.updateQuestion(data);
        if (response) {
            return new SuccessMsgResponse("Update question successfully!").send(res);
        }
        return new FailureMsgResponse("Update question failed!").send(res);

    }

    deleteQuestion = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            // testKitId: req.params.testKitId,
            questionId: req.params.questionId,
        }
        const response = await this.testKitService.deleteQuestion(data);
        if (response) {
            return new SuccessMsgResponse("Delete question successfully!").send(res);
        }
        return new FailureMsgResponse("Delete question failed!").send(res);
    }
}
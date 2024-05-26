import { Request, Response } from "express";
import { TestService } from "@src/services/test-sets/TestService";
import { Container } from "typedi";
import { FailureMsgResponse, SuccessMsgResponse, SuccessResponse } from "@src/core/ApiResponse";

export class TestController {
    private testService: TestService;
    constructor() {
        this.testService = Container.get(TestService);
    }

    autoCreateTestSet = async (req: any, res: Response): Promise<any> => {
        const setId = req.body.setId;
        const result = await this.testService.createTest(setId, req.user.id)
        if (!result) {
            return new FailureMsgResponse("Create card failed!").send(res);
        }
        else {
            return new SuccessResponse("Create card successfully!", result).send(res);
        }
    }
}
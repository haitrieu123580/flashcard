import { Request, Response } from "express";
import { Container } from "typedi";
import { FailureMsgResponse, SuccessMsgResponse } from "@src/core/ApiResponse";
import { UserTestService } from "@src/services/user-test/UserTestService";
export class UserTestController {
    private service: UserTestService;
    constructor() {
        this.service = Container.get(UserTestService);
    }

    saveTestResult = async (req: any, res: Response): Promise<any> => {
        const data = {
            user: req.user,
            testId: req.body.testId,
            answers: req.body.answers
        }
        const result = await this.service.saveTestResult(data.user.id, data.testId, data.answers)
        if (!result) {
            return new FailureMsgResponse("Create card failed!").send(res);
        }
        else {
            return new SuccessMsgResponse("Create card successfully!").send(res);
        }
    }
}
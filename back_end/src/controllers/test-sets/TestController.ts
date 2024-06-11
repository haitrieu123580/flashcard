import { Request, Response } from 'express';
import { Container } from 'typedi';
import {
  FailureMsgResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '@src/core/ApiResponse';
import { TestService } from '@src/services/test-sets/TestService';

export class TestController {
  private testService: TestService;
  constructor() {
    this.testService = Container.get(TestService);
  }

  autoCreateTestSet = async (req: any, res: Response): Promise<any> => {
    const setId = req.body.setId;
    const data = {
      setId: req.body.setId,
      userId: req.user.id,
      level: req.body.level,
    };
    const result = await this.testService.createTest(data);
    if (!result) {
      return new FailureMsgResponse('Create card failed!').send(res);
    } else {
      return new SuccessResponse('Create card successfully!', result).send(res);
    }
  };
}

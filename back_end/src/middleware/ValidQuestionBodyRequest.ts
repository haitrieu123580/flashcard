import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

import {
  AccessTokenErrorResponse,
  AuthFailureResponse,
  InternalErrorResponse,
} from '../core/ApiResponse';
import { CreateQuestionRequest } from '../dto/questions/CreateQuestionRequest';

export const checkValidQuestionBodyRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const { question, answers, setId, correct_answer } = req.body;
  if (Array.isArray(answers) && answers.includes(correct_answer)) {
    next();
  } else {
    return new InternalErrorResponse(
      'Correct answer must be one of the answers',
    ).send(res);
  }
};

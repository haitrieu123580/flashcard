import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import {
  AccessTokenErrorResponse,
  AuthFailureResponse,
  InternalErrorResponse,
} from '../core/ApiResponse';

dotenv.config();
const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token: string = authHeader.split(' ')[1];
    jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
      if (err) return new AccessTokenErrorResponse('Invalid Token').send(res);
      (req as any).user = user;
      next();
    });
  } else {
    return new AuthFailureResponse('Token not found').send(res);
  }
};

export default verifyToken;

import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
const getUser = (req: Request): any => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token: string = authHeader.split(' ')[1];
    const user = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
      (err, user) => {
        if (err) return null;
        return user;
      },
    );
    return user;
  }
};

export default getUser;

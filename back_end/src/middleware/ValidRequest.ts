import { NextFunction, Request, Response } from 'express';

const isValidRequest = (targetRequest: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (!validateRequest(request.body, targetRequest)) {
        response.status(400).json({ error: 'Invalid request format' });
      }
      if (!validateNotNull(request.body)) {
        response.status(400).json({ error: 'Fields not null' });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

const validateRequest = (requestData: any, expectedType: any): boolean => {
  for (const key in expectedType) {
    if (typeof requestData[key] !== typeof expectedType[key]) {
      return false;
    }
  }
  return true;
};
const validateNotNull = (requestData: any): boolean => {
  for (const key in requestData) {
    if (
      requestData[key] === '' ||
      requestData[key] === null ||
      requestData[key] === undefined
    ) {
      return false;
    }
  }
  return true;
};
export default isValidRequest;

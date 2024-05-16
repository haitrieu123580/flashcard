import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

export const AsyncHandler = (execution: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        execution(req, res, next).catch(next);
    };
};

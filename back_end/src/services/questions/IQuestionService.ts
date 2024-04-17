import { Request, Response } from 'express';
export interface IQuestionService {

    GetQuestionList(req: Request, res: Response): Promise<any>;

    GetQuestion(req: Request, res: Response): Promise<any>;
    CreateQuestion(req: Request, res: Response): Promise<any>;
    UpdateQuestion(req: Request, res: Response): Promise<any>;
    DeleteQuestion(req: Request, res: Response): Promise<any>;
}
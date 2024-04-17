import { Request, Response } from 'express';
import { Container } from 'typedi';
import { IQuestionService } from '@src/services/questions/IQuestionService';
import { QuestionService } from '@src/services/questions/QuestionService';

export class QuestionController {
    private service: IQuestionService;
    constructor() {
        this.service = Container.get(QuestionService);
    }

    //get all question in a set
    getQuestionList = async (req: Request, res: Response): Promise<any> => {
        return this.service.GetQuestionList(req, res);
    }

    getQuestion = async (req: Request, res: Response): Promise<any> => {
        return this.service.GetQuestion(req, res);
    }

    createQuestion = async (req: Request, res: Response): Promise<any> => {
        return this.service.CreateQuestion(req, res);
    }

    updateQuestion = async (req: Request, res: Response): Promise<any> => {
        return this.service.UpdateQuestion(req, res);
    }

    deleteQuestion = async (req: Request, res: Response): Promise<any> => {
        return this.service.DeleteQuestion(req, res);
    }
}
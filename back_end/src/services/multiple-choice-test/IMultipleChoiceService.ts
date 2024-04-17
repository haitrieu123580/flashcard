import { Request, Response } from "express";

export interface IMultipleChoiceService {

    getMultipleChoiceTestBySetId(req: Request, res: Response): Promise<any>;

    submitAnswer(req: Request, res: Response): Promise<any>;
}
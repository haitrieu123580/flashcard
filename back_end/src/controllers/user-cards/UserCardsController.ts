import { Request, Response } from "express";
import { Container } from 'typedi';
import { IUserCardsService } from "@src/services/user-cards/IUserCardsService";
import { UserCardsService } from "@src/services/user-cards/UserCardsService";
import { FailureMsgResponse, SuccessMsgResponse } from "@src/core/ApiResponse";
export class UserCardsController {

    private service: IUserCardsService;
    constructor() {
        this.service = Container.get(UserCardsService);
    }

    // Change 'req' type from 'Request' to 'data' after verifyToken middleware, (user id)
    createCard = async (req: any, res: Response): Promise<any> => {
        const data = {
            user: req.user,
            term: req.body.term,
            define: req.body.define,
            example: req.body.example,
            image: req.file,
            set_id: req.body.setId
        }
        const result = await this.service.CreateCard(data)
        if (!result) {
            return new FailureMsgResponse("Create card failed!").send(res);
        }
        else {
            return new SuccessMsgResponse("Create card successfully!").send(res);
        }
    }

    updateCard = async (req: any, res: Response): Promise<any> => {
        const data = {
            user: req.user,
            id: req.params.id,
            term: req.body.term,
            define: req.body.define,
            example: req.body.example,
            image: req.file,
            is_delete_image: req.body.is_delete_image,

        }
        const response = await this.service.UpdateCard(data);
        if (response) {
            return new SuccessMsgResponse("Update card successfully!").send(res);
        }
        return new FailureMsgResponse("Update card failed!").send(res);
    }

    deleteCard = async (req: Request, res: Response): Promise<any> => {
        return this.service.DeleteCard(req, res);
    }
}

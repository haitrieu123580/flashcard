import { Container } from "typedi";
import { IUserSetsService } from "@src/services/user-sets/IUserSetsService";
import { UserSetsService } from "@src/services/user-sets/UserSetsService";
import { Request, Response } from "express";
import { UpdateSetRequest } from "@src/dto/set";
import {
    SuccessResponse,
    FailureMsgResponse,
    SuccessMsgResponse,
    FailureResponse
} from '@src/core/ApiResponse';
export class UserSetsController {
    private userSetsService: IUserSetsService = Container.get(UserSetsService);
    getUserSetsList = async (req: any, res: any) => {
        const userId = req?.user?.id;
        const response = await this.userSetsService.getUserSetsList(userId);
        if (response) {
            return new SuccessResponse('User sets list', response).send(res);
        }
    }
    getUserSetById = async (req: any, res: any) => {
        const userId = req?.user?.id;
        const setId = req.params.id;
        const response = await this.userSetsService.getUserSetById(userId, setId);
        if (response) {
            return new SuccessResponse('User set', response).send(res);
        }
    }
    addCardToUserSet = async (req: any, res: any) => {
        const data = {
            user: req.user,
            setId: req.body.setId,
            cardId: req.body.cardId,
        }
        await this.userSetsService.addCardToUserSet(data);
        return new SuccessMsgResponse('Card added to set successfully ').send(res);
    }

    quickCreateSet = async (req: any, res: any) => {
        const data = {
            user: req.user,
            set_name: req.body.set_name,
            cardId: req.body.cardId,
        }
        await this.userSetsService.quickCreateSet(data);
        return new SuccessMsgResponse('Card added to set successfully ').send(res);
    }

    updateSet = async (req: any, res: Response) => {
        const data: UpdateSetRequest = {
            user: {
                id: req?.user.id,
                email: req?.user.email,
                role: req?.user.role,
                username: req?.user.username
            },
            id: req.params.id,
            set_name: req.body.set_name,
            set_description: req.body.set_description,
            is_delete_image: req.body.is_delete_image,
            files: req.files,
        }
        const response = await this.userSetsService.updateUserSet(data);
        if (response) {
            return new SuccessMsgResponse('Update set successfully').send(res);
        }
    }


    deleteMySet = async (req: Request, res: Response) => {
        await this.userSetsService.deleteUserSet(req, res);
    }

    requestToPublicSet = async (req: any, res: Response) => {
        const data = {
            user: req.user,
            setId: req.body.setId
        }
        const response = await this.userSetsService.requestToPublicSet(data);
        if (!response) {
            return new FailureMsgResponse('Request to public set failed').send(res);
        }
        return new SuccessMsgResponse('Request to public set successfully').send(res);
    }
}
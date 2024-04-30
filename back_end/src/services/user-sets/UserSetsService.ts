import { IUserSetsService } from "./IUserSetsService";
import {
    SuccessMsgResponse,
    SuccessResponse,
    FailureMsgResponse,
    FailureResponse,
    InternalErrorResponse,
} from '@src/core/ApiResponse';
import { Service, Container } from "typedi";
import { IUserSetsRepo } from "@src/repositories/user-sets/IUserSetsRepo";
import { UserSetsRepo } from "@src/repositories/user-sets/UserSetsRepo";
import UserRepoInterface from "@repositories/user/UserRepoInterface";
import UserRepo from "@repositories/user/UseRepo";
import { VocabularyCardRepo } from "@src/repositories/vocabulary-card/VocabularyCardRepo";
import { IVocabularyCardRepo } from "@src/repositories/vocabulary-card/IVocabularyCardRepo";
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';
import { Request, Response } from "express";

@Service()
export class UserSetsService implements IUserSetsService {
    private userSetsRepo: IUserSetsRepo;
    private userRepo: UserRepoInterface;
    private setRepo: IVocabularySetRepo;
    private cardRepo: IVocabularyCardRepo;

    constructor() {
        this.userSetsRepo = Container.get(UserSetsRepo);
        this.userRepo = Container.get(UserRepo);
        this.setRepo = Container.get(VocabularySetRepo);
        this.cardRepo = Container.get(VocabularyCardRepo);
    }
    async getUserSetsList(req: any, res: any): Promise<any> {
        try {
            const { id, email } = req.user;
            const user = await this.userRepo.getUserBy("id", id);
            if (!user) {
                return new FailureMsgResponse("User not found.").send(res)
            }
            const sets = await this.userSetsRepo.getUserSetsList(id);
            return new SuccessResponse("User sets list", sets).send(res)

        } catch (error) {

        }
    }
    getUserSetById(req: any, res: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addCardToUserSet = async (req: any, res: any): Promise<any> => {
        try {
            const {
                setId,
                cardId
            } = req.body;
            const { id } = req.user;
            //check if set belong to user
            const set = await this.setRepo.get_set_by_id(setId);
            if (set && set?.user?.id === id) {
                const card = await this.cardRepo.getCardById(cardId);
                if (card) {
                    const result = await this.userSetsRepo.addCardToSet(set.id, card.id);
                    if (result) {
                        return new SuccessMsgResponse('Add card to set successfully').send(res);
                    }
                    return new FailureMsgResponse('Add card to set failed').send(res);
                }
                else {
                    return new FailureMsgResponse('Card not founded!').send(res);
                }
            }
            return new FailureMsgResponse('Set not founded!').send(res);
        } catch (error) {
            console.log("error", error)
            return new FailureResponse('Internal Server Error ', error).send(res);
        }
    }

    createSetByUser = async (req: any, res: Response) => {
        try {
            const { id } = req.user;
            const { set_name, set_description } = req.body;

        } catch (error) {

        }
    }
}
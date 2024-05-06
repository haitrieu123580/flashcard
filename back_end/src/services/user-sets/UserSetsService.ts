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
            const [sets, count] = await this.userSetsRepo.getUserSetsList(id);
            if (sets?.length) {
                sets.forEach((set: any) => {
                    set.totalCards = set?.cards?.length;
                    set.totalQuestions = set?.questions?.length;
                    try {
                        set.cards.forEach((card: any) => {
                            return card.example = card.example ? JSON.parse(card.example || "") : "";
                        });
                    } catch (error) {

                    }

                    return set;
                });
                return new SuccessResponse('Get all user sets successfully', {
                    sets,
                    count,
                }).send(res);
            } else {
                return new FailureMsgResponse("Empty!").send(res);
            }

        } catch (error) {
            console.log("error", error)
            return new FailureResponse('Internal Server Error ', error).send(res);
        }
    }
    getUserSetById = async (req: any, res: any): Promise<any> => {
        try {
            const { id } = req.user;
            const { setId } = req.params;
            const set = await this.setRepo.get_set_by_id(setId);
            const user = await this.userRepo.getUserBy("id", id);
            if (!set) {
                return new FailureMsgResponse("Set not found").send(res)
            }
            if (set?.user?.id == user?.id) {
                return new SuccessResponse("Get set successfully", set).send(res)
            }
            return new FailureMsgResponse("Set not belong to user").send(res)
        } catch (error) {
            console.log("error", error)
            return new FailureResponse('Internal Server Error ', error).send(res);
        }
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

    quickCreateSet = async (req: any, res: any): Promise<any> => {
        try {
            const { id } = req.user;
            const {
                setName,
                cardId
            } = req.body;
            const user = await this.userRepo.getUserBy("id", id);
            if (!user) {
                return new FailureMsgResponse("User not found.").send(res)
            }
            const card = await this.cardRepo.getCardById(cardId);
            if (!card) {
                return new FailureMsgResponse("Card not found.").send(res)
            }
            const set = {
                name: setName,
                is_public: false,
                created_by: user.email,
                user: user,
                cards: [card]
            }
            const result = await this.setRepo.createSet(set)
            if (result) {
                return new SuccessResponse("Create set successfully", result).send(res)
            }
            return new FailureMsgResponse("Create set failed").send(res)

        } catch (error) {
            console.log("error", error)
            return new FailureResponse('Internal Server Error ', error).send(res);
        }
    }
}
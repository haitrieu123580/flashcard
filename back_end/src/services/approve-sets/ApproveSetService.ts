import Container, { Service } from "typedi";
import { IApproveSetService } from "./IApproveSetService";
import { VocabularySetRepo } from "@src/repositories/vocabulary-set/VocabularySetRepo";
import { IVocabularySetRepo } from "@src/repositories/vocabulary-set/IVocabularySetRepo";
import UserRepo from "@src/repositories/user/UseRepo";
import UserRepoInterface from "@src/repositories/user/UserRepoInterface";
import { Constants } from "@src/core/Constant";
import {
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
    BadRequestError,
    NoDataError,
} from "@src/core/ApiError";
import { Sets } from "@src/entity/Sets";
import { ApproveSetRequest } from "@src/dto/approve-sets";


@Service()
export class ApproveSetService implements IApproveSetService {
    private setRepo: IVocabularySetRepo;
    private userRepo: UserRepoInterface;
    constructor() {
        this.setRepo = Container.get(VocabularySetRepo);
        this.userRepo = Container.get(UserRepo);
    }
    async getPendingSets(): Promise<any> {
        const [sets, count] = await this.setRepo.getSetsByStatus(Constants.SET_STATUS.PENDING);
        if (sets?.length) {
            sets.forEach((set: any) => {
                try {
                    set.cards.forEach((card: any) => {
                        return card.example = card.example ? JSON.parse(card.example || "") : "";
                    });
                } catch (error) {

                }

                return set;
            });
            return {
                sets: sets.map((set: any) => ({
                    ...set,
                    totalCards: set?.cards?.length,
                    totalQuestions: set?.questions?.length,
                })),
                count,
            };

        } else {
            throw new NoDataError('Set not found!');
        }
    }
    async approveSet(data: ApproveSetRequest): Promise<any> {
        const set = await this.setRepo.get_set_by_id(data.setId);
        const user = await this.userRepo.getUserBy("id", data.user?.id);
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        if (!user) {
            throw new NotFoundError("User not found");
        }
        set?.status === Constants.SET_STATUS.PENDING ? Constants.SET_STATUS.APPROVED : set?.status;
        await this.setRepo.edit_set(set);
        const newSet = new Sets();
        newSet.name = set.name;
        newSet.description = set.description;
        newSet.image = set.image;
        newSet.created_by = set.created_by;
        newSet.cards = set.cards;
        newSet.is_public = true;
        newSet.user = user;
        return this.setRepo.createSet(newSet);
    }
    async rejectSet(data: ApproveSetRequest): Promise<any> {
        const set = await this.setRepo.get_set_by_id(data.setId);
        const user = await this.userRepo.getUserBy("id", data.user?.id);
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        if (!user) {
            throw new NotFoundError("User not found");
        }
        set?.status === Constants.SET_STATUS.PENDING ? Constants.SET_STATUS.REJECTED : set?.status;
        set.is_public = false;
        return this.setRepo.edit_set(set);
    }
    async getApprovedSets(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getRejectedSets(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
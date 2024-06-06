import { Container, Service } from "typedi";
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
import { Cards } from "@src/entity/Cards";
import { isAdmin } from '../../middleware/isAdmin';
import { AppDataSource } from "@src/data-source";

@Service()
export class ApproveSetService implements IApproveSetService {
    private setRepo: IVocabularySetRepo;
    private userRepo: UserRepoInterface;
    constructor() {
        this.setRepo = Container.get(VocabularySetRepo);
        this.userRepo = Container.get(UserRepo);
    }
    getPendingSets = async (): Promise<any> => {
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
    approveSet = async (data: ApproveSetRequest): Promise<any> => {
        if (!data.setId || !data.user?.id) { throw new BadRequestError("Invalid data") }
        const set = await this.setRepo.get_set_by_id(data.setId);
        const user = await this.userRepo.getUserBy("id", data.user?.id);
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        if (!user) {
            throw new NotFoundError("User not found");
        }
        // if (set?.status != Constants.SET_STATUS.PENDING) {
        //     throw new ForbiddenError("Set already approved or rejected");
        // }
        set.status = Constants.SET_STATUS.APPROVED;
        await this.setRepo.edit_set(set);
        const newSet = new Sets();
        newSet.name = set.name;
        newSet.description = set.description;
        newSet.image = set.image;
        newSet.created_by = set.created_by;
        newSet.cards = [];
        set.cards.forEach((card: Cards) => {
            const newCard = new Cards();
            newCard.set = newSet;
            newCard.term = card.term;
            newCard.define = card.define;
            newCard.image = card.image;
            newCard.example = card.example;
            newCard.created_by = card.created_by;
            newSet.cards.push(newCard);

        })
        newSet.is_public = true;
        newSet.user = user;
        newSet.level = data?.level ? data.level : 1;
        await AppDataSource.transaction(async manager => {
            await manager.save(newSet);
            await manager.save(newSet.cards);
        });
        // return await this.setRepo.createSet(newSet);
    }
    rejectSet = async (data: ApproveSetRequest): Promise<any> => {
        if (!data.setId || !data.user?.id) { throw new BadRequestError("Invalid data") }
        const set = await this.setRepo.get_set_by_id(data.setId);
        const user = await this.userRepo.getUserBy("id", data.user?.id);
        if (!set) {
            throw new NotFoundError("Set not found");
        }
        if (!user) {
            throw new NotFoundError("User not found");
        }
        // if (set?.status != Constants.SET_STATUS.PENDING) {
        //     throw new ForbiddenError("Set already approved or rejected");
        // }
        set.status = Constants.SET_STATUS.REJECTED;
        set.is_public = false;
        return this.setRepo.edit_set(set);
    }

    getSetByAdmin = async (data: any) => {
        const { userId, setId } = data
        if (!userId || !setId) { throw new BadRequestError("Invalid data") }
        const user = await this.userRepo.getUserBy("id", userId);
        if (!user) throw new AuthFailureError("user not found");
        if (user.role !== Constants.USER_ROLE.ADMIN) throw new ForbiddenError("admin only")
        const set = await this.setRepo.get_set_by_id(setId);
        return set;
    }

}
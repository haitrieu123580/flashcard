import { Request, Response } from "express";
import {
    SuccessResponse,
    FailureMsgResponse,
    SuccessMsgResponse,
    FailureResponse
} from '@src/core/ApiResponse';
import { IUserCardsService } from "./IUserCardsService";
import Container, { Service } from "typedi";
import { IVocabularyCardRepo } from "@src/repositories/vocabulary-card/IVocabularyCardRepo";
import { VocabularyCardRepo } from "@src/repositories/vocabulary-card/VocabularyCardRepo";
import { S3Service } from '@services/s3/S3Service';
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';
import UserRepoInterface from "@repositories/user/UserRepoInterface";
import UserRepo from "@repositories/user/UseRepo";
import {
    CreateCardDataRequest,
    UpdateCardDataRequest
} from "@src/dto/cards";
import {
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
    BadRequestError,
} from "@src/core/ApiError";
import { Cards } from "@src/entity/Cards";

@Service()
export class UserCardsService implements IUserCardsService {
    private cardRepo: IVocabularyCardRepo;
    private s3Service: S3Service;
    private setRepo: IVocabularySetRepo;
    private userRepo: UserRepoInterface;

    constructor() {
        this.cardRepo = Container.get(VocabularyCardRepo);
        this.s3Service = Container.get(S3Service);
        this.setRepo = Container.get(VocabularySetRepo);
        this.userRepo = Container.get(UserRepo);
    }
    CreateCard = async (data: CreateCardDataRequest): Promise<Cards | null> => {
        const image = data.image;
        const setId = data.set_id;
        if (!setId) {
            throw new BadRequestError("Set id is required!");
        }
        const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url

        const cardData = {
            term: data.term,
            define: data.define,
            example: data?.example,
            image: image_url?.Location || ""
        }
        const set = await this.setRepo.get_set_by_id(setId);
        const user = await this.userRepo.getUserBy("id", data.user.id);
        if (!user) {
            throw new AuthFailureError("User not found");
        }
        if (!set) {
            throw new NotFoundError('Set not found');
        }
        if (set?.user?.id !== user?.id) {
            throw new ForbiddenError("You are not the owner of this set!");
        }

        return await this.cardRepo.create_card(user, set, cardData);

    }

    UpdateCard = async (data: UpdateCardDataRequest): Promise<any> => {
        const updatedCard = await this.cardRepo.getCardById(data.id);
        const user = await this.userRepo.getUserBy("id", data.user.id);
        if (!user) {
            throw new AuthFailureError("User not found");
        }
        if (!updatedCard) {
            throw new NotFoundError('Card not found');
        }
        if (!user?.username === updatedCard.created_by) {
            throw new ForbiddenError("You are not the owner of this card!");
        }
        const isDeleteImage = data.is_delete_image === "true";
        //todo delete image on S3
        const image_url = data.image ? await this.s3Service.uploadFile(data.image) : null; // Nếu có ảnh thì upload lên S3 và lấy url

        const cardData = {
            ...updatedCard,
            term: data.term || updatedCard.term,
            define: data.define || updatedCard.define,
            example: data?.example || updatedCard?.example,
            image: isDeleteImage ? null : image_url ? image_url.Location : updatedCard.image,
            updated_by: user.email,
        }

        return this.cardRepo.edit_card(cardData);
    }

    DeleteCard = async (req: any, res: Response): Promise<any> => {
        try {
            const cardId = req.params.id;
            const { id } = req.user
            const user = await this.userRepo.getUserBy("id", id);
            const deleteCard = await this.cardRepo.getCardById(cardId);
            if (!deleteCard) {
                return new FailureMsgResponse("Card not found.").send(res);
            }
            if (!user?.username === deleteCard?.created_by) {
                return new FailureMsgResponse("You are not the owner of this card!").send(res);
            }
            const result = await this.cardRepo.delete_card(cardId);
            if (!result) {
                return new FailureMsgResponse("Delete card failed!").send(res);
            }
            return new SuccessMsgResponse("Delete card successfully!").send(res);
        } catch (error) {
            console.log('error', error);
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
    }
}
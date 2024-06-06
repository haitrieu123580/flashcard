import { Request, Response } from "express";
import {
    SuccessResponse,
    FailureMsgResponse,
    SuccessMsgResponse,
    FailureResponse
} from '@src/core/ApiResponse';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
    BadRequestError,
    AuthFailureError,
    ForbiddenError,
    NoDataError,
} from '@src/core/ApiError';
import { ICardService } from "./ICardService";
import Container, { Service } from "typedi";
import { IVocabularyCardRepo } from "@src/repositories/vocabulary-card/IVocabularyCardRepo";
import { VocabularyCardRepo } from "@src/repositories/vocabulary-card/VocabularyCardRepo";
import { S3Service } from '@services/s3/S3Service';
import { VocabularySetRepo } from "@src/repositories/vocabulary-set/VocabularySetRepo";
import { IVocabularySetRepo } from "@src/repositories/vocabulary-set/IVocabularySetRepo";
import UserRepo from "@src/repositories/user/UseRepo";
import UserRepoInterface from "@src/repositories/user/UserRepoInterface";
import { Cards } from "@src/entity/Cards";
import { CreateCardDataRequest, UpdateCardDataRequest } from "@src/dto/cards";
import { Constants } from "@src/core/Constant";
@Service()
export class CardService implements ICardService {
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
        // try {
        const image = data.image;
        const setId = data.set_id;
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
        return await this.cardRepo.create_card(user, set, cardData);

    }

    UpdateCard = async (data: UpdateCardDataRequest): Promise<any> => {
        // try {
        const user = await this.userRepo.getUserBy("id", data.user.id);
        if (!user) {
            throw new AuthFailureError("User not found");
        }
        if (user.role !== Constants.USER_ROLE.ADMIN) {
            throw new ForbiddenError("You are not allowed to update this card!");
        }
        const id = data.id;
        const isDeleteImage = data.is_delete_image === "true";
        //todo delete image on S3
        const image_url = data.image ? await this.s3Service.uploadFile(data.image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
        const updatedCard = await this.cardRepo.getCardById(id);
        if (!updatedCard) {
            throw new NotFoundError('Card not found');
        }
        const cardData = {
            ...updatedCard,
            term: data.term || updatedCard.term,
            define: data.define || updatedCard.define,
            example: data?.example || updatedCard.example,
            image: isDeleteImage ? null : image_url ? image_url.Location : updatedCard.image,
            updated_by: user.email,
        }
        return this.cardRepo.edit_card(cardData);
        // if (!result) {
        //     // return new FailureMsgResponse("Update card failed!").send(res);
        // }
        // return new SuccessMsgResponse("Update card successfully!").send(res);
        // } catch (error) {
        //     console.log('error', error);
        //     return new FailureMsgResponse('Internal Server Error ').send(res);
        // }
    }

    DeleteCard = async (req: any, res: Response): Promise<any> => {
        try {
            const id = req.params.id;
            const isExist = await this.cardRepo.isExistCard(id);
            if (!isExist) {
                return new FailureMsgResponse("Card not found!").send(res);
            }
            const result = await this.cardRepo.delete_card(id);
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
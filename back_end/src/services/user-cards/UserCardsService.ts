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
    CreateCard = async (req: any, res: Response): Promise<any> => {
        try {
            const { id } = req.user;
            const formData = req.body;
            const image = req.file;
            const setId = formData.set_id;
            const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
            const cardData = {
                term: formData.term,
                define: formData.define,
                example: formData?.example,
                image: image_url?.Location || null
            }
            //todo check existed set yet
            const set = await this.setRepo.get_set_by_id(setId);
            const user = await this.userRepo.getUserBy("id", id);
            if (set?.user?.id !== user?.id) {
                return new FailureMsgResponse("You are not the owner of this set!").send(res);
            }

            const result = await this.cardRepo.create_card(setId, cardData);
            if (result) {
                return new SuccessMsgResponse("Create card successfully!").send(res);
            }
            return new FailureMsgResponse("Create card failed!").send(res);
        } catch (error) {
            console.log('error', error);
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
    }

    UpdateCard = async (req: any, res: Response): Promise<any> => {
        try {
            const cardId = req.params.id;
            const { id } = req.user
            const formData = req.body;
            const image = req.file;
            const isDeleteImage = formData.is_delete_image === "true";
            //todo delete image on S3
            const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
            const updatedCard = await this.cardRepo.getCardById(cardId);
            const cardData = {
                term: formData.term || updatedCard.term,
                define: formData.define || updatedCard.define,
                example: formData?.example || updatedCard?.example,
                image: isDeleteImage ? null : image_url ? image_url.Location : updatedCard.image
            }
            const user = await this.userRepo.getUserBy("id", id);
            if (!updatedCard) {
                return new FailureMsgResponse("Card not found.").send(res);
            }
            if (!user?.email === updatedCard.created_by) {
                return new FailureMsgResponse("You are not the owner of this card!").send(res);
            }
            const result = await this.cardRepo.edit_card(cardId, cardData);
            if (!result) {
                return new FailureMsgResponse("Update card failed!").send(res);
            }
            return new SuccessMsgResponse("Update card successfully!").send(res);
        } catch (error) {
            console.log('error', error);
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
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
            if (!user?.email === deleteCard?.created_by) {
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
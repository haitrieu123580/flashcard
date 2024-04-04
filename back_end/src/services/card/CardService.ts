import { Request, Response } from "express";
import {
    SuccessResponse,
    FailureMsgResponse,
    SuccessMsgResponse,
    FailureResponse
} from '@src/core/ApiResponse';
import { ICardService } from "./ICardService";
import Container, { Service } from "typedi";
import { IVocabularyCardRepo } from "@src/repositories/vocabulary-card/IVocabularyCardRepo";
import { VocabularyCardRepo } from "@src/repositories/vocabulary-card/VocabularyCardRepo";
import { S3Service } from '@services/s3/S3Service';

@Service()
export class CardService implements ICardService {
    private cardRepo: IVocabularyCardRepo;
    private s3Service: S3Service;

    constructor() {
        this.cardRepo = Container.get(VocabularyCardRepo);
        this.s3Service = Container.get(S3Service);

    }
    CreateCard = async (req: any, res: Response): Promise<any> => {
        try {
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
            const id = req.params.id;
            const formData = req.body;
            const image = req.file;
            const isDeleteImage = formData.is_delete_image === "true";
            //todo delete image on S3
            const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
            const updatedCard = await this.cardRepo.getCardById(id);
            const cardData = {
                term: formData.term || updatedCard.term,
                define: formData.define || updatedCard.define,
                example: formData?.example || updatedCard.example,
                image: isDeleteImage ? null : image_url ? image_url.Location : updatedCard.image
            }
            const result = await this.cardRepo.edit_card(id, cardData);
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
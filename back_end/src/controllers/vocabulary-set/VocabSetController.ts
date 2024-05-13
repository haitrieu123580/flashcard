import { Request, Response } from "express";
import { Container, Inject } from 'typedi';
import { IVocabularySetService } from '@services/vocabulary-set/IVocabularySetService';
import VocabularySetService from '@services/vocabulary-set/VocabularySetService';
import { GetAllPublicSetRequest } from "@src/dto/set/GetAllPublicSetRequest";
import {
    SuccessResponse,
    FailureMsgResponse,
    SuccessMsgResponse,
    FailureResponse
} from '@src/core/ApiResponse';

class VocabularySetController {

    private service: IVocabularySetService;
    constructor() {
        this.service = Container.get(VocabularySetService);
    }

    get_all_public_sets = async (req: Request, res: Response): Promise<any> => {
        const query: GetAllPublicSetRequest = {
            page_size: req.query?.page_size?.toString(),
            page_index: req.query?.page_index?.toString(),
            filter: req.query?.filter?.toString(),
            name: req.query?.name?.toString()
        }
        const result = await this.service.get_all_public_sets(query);
        if (result) {
            return new SuccessResponse('Get all public sets successfully', {
                ...result
            }).send(res);
        }
        return new FailureMsgResponse("Empty!").send(res);
        // return this.service.get_all_public_sets(req, res);
    }

    getSet = async (req: Request, res: Response): Promise<any> => {
        return this.service.getSet(req, res);
    }

    // Change 'req' type from 'Request' to 'data' after verifyToken middleware, (user id)
    createSet = async (req: any, res: Response): Promise<any> => {
        return this.service.create_update_Set_and_Cards(req, res)
    }

    updateSet = async (req: Request, res: Response): Promise<any> => {
        return this.service.create_update_Set_and_Cards(req, res);
    }

    deleteSet = async (req: Request, res: Response): Promise<any> => {
        return this.service.deleteSet(req, res);
    }

    // addCardToSet = async (req: Request, res: Response): Promise<any> => {
    //     return this.service.addCardToSet(req, res)
    // }
}
export default VocabularySetController;
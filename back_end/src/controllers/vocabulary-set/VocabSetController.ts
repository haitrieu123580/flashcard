import { Request, Response } from "express";
import { Container, Inject } from 'typedi';
import { IVocabularySetService } from '@services/vocabulary-set/IVocabularySetService';
import VocabularySetService from '@services/vocabulary-set/VocabularySetService';
class VocabularySetController {

    private service: IVocabularySetService;
    constructor() {
        this.service = Container.get(VocabularySetService);
    }

    get_all_public_sets = async (req: Request, res: Response): Promise<any> => {
        return this.service.get_all_public_sets(req, res);
    }

    get_my_sets = async (req: Request, res: Response): Promise<any> => {
        return this.service.get_my_sets(req, res);
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
}
export default VocabularySetController;
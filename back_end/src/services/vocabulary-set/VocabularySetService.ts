import { Request, Response } from 'express';
import { Service, Container } from 'typedi';
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';
import { IVocabularySetService } from './IVocabularySetService';
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';
import { S3Service } from '@services/s3/S3Service';
import { Constants } from '@src/core/Constant';
import { IVocabularyCardRepo } from '@repositories/vocabulary-card/IVocabularyCardRepo';
import { VocabularyCardRepo } from '@repositories/vocabulary-card/VocabularyCardRepo';

@Service()
class VocabularySetService implements IVocabularySetService {

    private setRepo: IVocabularySetRepo;
    private cardRepo: IVocabularyCardRepo;
    private s3Service: S3Service;

    constructor() {
        this.setRepo = Container.get(VocabularySetRepo);
        this.s3Service = Container.get(S3Service);
        this.cardRepo = Container.get(VocabularyCardRepo);
    }

    get_all_public_sets = async (req: Request, res: Response): Promise<any> => {
        try {
            const { page_size, page_index, filter, name } = req.query;
            const [sets, count] = await this.setRepo.get_all_public_sets(
                {
                    take: page_size || Constants.DEFAULT_PAGINATION.take,
                    skip: Number(page_index) === 1 ? 0 : (Number(page_index) - 1) * Number(page_size) || Constants.DEFAULT_PAGINATION.skip,
                    query: filter || "",
                    name: name || ""
                }
            );
            if (sets?.length) {
                sets.forEach((set: any) => {
                    return set.totalCards = set.cards.length;
                })
                return new SuccessResponse('Get all public sets successfully', {
                    sets,
                    count
                }).send(res);
            }
            else {
                return new FailureMsgResponse("Empty!").send(res);
            }
        } catch (error) {
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
    }

    get_my_sets = async (req: any, res: Response): Promise<any> => {
        try {
            const userId = req.user.id;
            const sets = await this.setRepo.get_my_sets(userId);
            if (sets?.length) {
                return new SuccessResponse('Get my sets successfully', sets).send(res);
            }
            return new FailureMsgResponse("Empty!").send(res);
        } catch (error) {
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
    }

    getSet = async (req: Request, res: Response): Promise<any> => {
        try {
            const setId = req.params.id;
            const set = await this.setRepo.get_set_by_id(setId);
            if (set) {
                return new SuccessResponse('Get set successfully', set).send(res);
            }
            return new FailureMsgResponse("Set not founded!").send(res)
        } catch (error) {
            return new FailureResponse('Internal Server Error ', error).send(res);
        }
    }

    deleteSet = async (req: Request, res: Response): Promise<any> => {
        return res.json({ message: 'Delete set' });
    }

    create_update_Set_and_Cards = async (req: any, res: Response): Promise<any> => {
        const setId = req?.params?.id;
        if (setId) {
            //update
            return this.edit_set_and_cards(req, res)
        }
        else {
            return this.create_Set(req, res)
        }
    }

    create_Set = async (req: any, res: Response) => {
        try {
            const cards = [];
            const formData = req.body;
            const userId = req.user.id;
            const files = req.files;
            let image = null;
            for (let i = 0; formData[`card[${i}].term`]; i++) {
                const term = formData[`card[${i}].term`];
                const define = formData[`card[${i}].define`];
                files.forEach((file: any) => {
                    if (file.fieldname === `card[${i}].image`) {
                        image = file;
                    }
                })
                // ? if save to database not success, need to delete image from S3?
                const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
                cards.push({ term, define, image_url: image_url?.Location || "" });
            }

            const { set_name, set_description } = formData;
            const set_image = files.find((file: any) => file.fieldname === 'set_image');
            const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
            const set = { set_name, set_description, set_image_url: set_image_url?.Location || "" };
            await this.setRepo.create_new_set_and_cards(userId, set, cards);
            return new SuccessMsgResponse('Create set successfully').send(res);
        } catch (error) {
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }

    }

    edit_set_and_cards = async (req: any, res: Response) => {
        const errorCardAction = []
        try {
            const setId = req?.params?.id;
            const formData = req.body
            const files = req?.files
            let image;
            const { set_name, set_description } = formData;
            const set_image = files.find((file: any) => file.fieldname === 'set_image');
            const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
            const set = { set_name, set_description, set_image_url };
            for (let i = 0; formData[`card[${i}].term`]; i++) {
                const term = formData[`card[${i}].term`];
                const define = formData[`card[${i}].define`];
                const cardFlag = formData[`card[${i}].flag`];
                const cardId = formData[`card[${i}].id`];
                files.forEach((file: any) => {
                    if (file.fieldname === `card[${i}].image`) {
                        image = file;
                    }
                })
                try {
                    const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
                    switch (Number(cardFlag)) {
                        case Constants.CARD_FLAG.CREATE_MODE:
                            const new_card = await this.cardRepo.create_card(setId,
                                {
                                    term: term,
                                    define: define,
                                    image: image_url,
                                    setId: setId,
                                })
                            if (!new_card) {
                                errorCardAction.push(`Create card ${i} failed`)
                            }
                            break;
                        case Constants.CARD_FLAG.EDIT_MODE:
                            if (cardId) {
                                const edit_card = await this.cardRepo.edit_card(cardId, {
                                    term: term,
                                    define: define,
                                    image: image_url,
                                })
                                if (!edit_card) {
                                    errorCardAction.push(`Edit card ${i} failed`)
                                }
                            }
                            else {
                                errorCardAction.push(`Edit card ${i} because card id is required`)
                            }
                            break;
                        case Constants.CARD_FLAG.DELETE_MODE:
                            if (cardId) {
                                const delete_card = await this.cardRepo.delete_card(cardId)
                                if (!delete_card) {
                                    errorCardAction.push(`Delete card ${i} failed`)
                                }
                            }
                            else {
                                errorCardAction.push(`Delete card ${i} because card id is required`)
                            }
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    errorCardAction.push(`Card ${i} failed because ${error}`)
                }
            }
            await this.setRepo.edit_set_by_id(setId, set);
            return new SuccessResponse('Edit set successfully', errorCardAction).send(res);
        } catch (error) {
            return new FailureResponse('Internal Server Error ', errorCardAction).send(res);
        }
    }
}
export default VocabularySetService;
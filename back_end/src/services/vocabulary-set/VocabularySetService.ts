import { Request, Response } from 'express';
import { Service, Container } from 'typedi';
import { SuccessResponse, FailureMsgResponse, SuccessMsgResponse, FailureResponse } from '@src/core/ApiResponse';
import { IVocabularySetService } from './IVocabularySetService';
import { IVocabularySetRepo } from '@repositories/vocabulary-set/IVocabularySetRepo';
import { VocabularySetRepo } from '@repositories/vocabulary-set/VocabularySetRepo';
import { S3Service } from '@services/s3/S3Service';
import { Constants } from '@src/core/Constant';

@Service()
class VocabularySetService implements IVocabularySetService {

    private setRepo: IVocabularySetRepo;
    private s3Service: S3Service;

    constructor() {
        this.setRepo = Container.get(VocabularySetRepo);
        this.s3Service = Container.get(S3Service);
    }

    get_all_public_sets = async (req: Request, res: Response): Promise<any> => {
        try {
            const { page_size, page_index, filter, name } = req.query;
            let data = {}
            const take = Number(page_size) || Constants.DEFAULT_PAGINATION.take;
            let skip = 0;
            if (Number(page_index) === 1) {
                skip = 0;
            } else {
                skip = (Number(page_index) - 1) * Number(page_size) || Constants.DEFAULT_PAGINATION.skip;
            }
            if (filter === 'asc' || filter === 'desc') {
                data = { take: take, skip: skip, filter, sortBy: 'setName' };
            }
            else if (filter === 'latest' || filter === 'oldest') {
                data = { take: take, skip: skip, filter, name, sortBy: 'createdDate' };
            }
            else {
                data = { take: take, skip: skip, filter, name, sortBy: 'createdDate' };
            }
            const [sets, count] = await this.setRepo.get_all_public_sets(data);
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
                return new SuccessResponse('Get all public sets successfully', {
                    sets,
                    count,
                }).send(res);
            } else {
                return new FailureMsgResponse("Empty!").send(res);
            }
        } catch (error) {
            console.log('error', error);
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
        try {
            const id = req.params.id;
            const isExist = await this.setRepo.isExistSet(id);
            if (isExist) {
                const result = await this.setRepo.deleteSetById(id);
                if (result) {
                    return new SuccessMsgResponse('Delete set successfully').send(res);
                }
                return new FailureMsgResponse('Delete set failed').send(res);
            }
            return new FailureMsgResponse('Set not founded!').send(res);
        } catch (error) {

        }
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
            for (let i = 0; formData[`card[${i}].term`]; i++) {
                let image = null;
                const term = formData[`card[${i}].term`];
                const define = formData[`card[${i}].define`];
                const example = formData[`card[${i}].example`];
                files.forEach((file: any) => {
                    if (file.fieldname === `card[${i}].image`) {
                        image = file;
                    }
                })
                // ? if save to database not success, need to delete image from S3?
                const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
                cards.push({ term, define, image_url: image_url?.Location || "", example });

            }

            const { set_name, set_description } = formData;
            const set_image = files.find((file: any) => file.fieldname === 'set_image');
            const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
            const set = { set_name, set_description, set_image_url: set_image_url?.Location || "" };

            await this.setRepo.create_new_set_and_cards(userId, set, cards);
            return new SuccessMsgResponse('Create set successfully').send(res);
        } catch (error) {
            console.log('error', error);
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }

    }

    edit_set_and_cards = async (req: any, res: Response) => {
        try {
            const setId = req?.params?.id;
            const formData = req.body
            const files = req?.files
            const isDeleteImage = formData.is_delete_image === "true";
            const { set_name, set_description } = formData;
            const set_image = files.find((file: any) => file.fieldname === 'set_image');
            const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
            const updateSet = await this.setRepo.get_set_by_id(setId);
            const set = {
                set_name,
                set_description,
                set_image_url: isDeleteImage
                    ? null
                    : set_image_url ? set_image_url.Location : updateSet.image
            };
            await this.setRepo.edit_set_by_id(setId, set);
            return new SuccessMsgResponse('Edit set successfully').send(res);
        } catch (error) {
            return new FailureMsgResponse('Internal Server Error ').send(res);
        }
    }
}
export default VocabularySetService;
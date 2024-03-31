"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const ApiResponse_1 = require("@src/core/ApiResponse");
const VocabularySetRepo_1 = require("@repositories/vocabulary-set/VocabularySetRepo");
const S3Service_1 = require("@services/s3/S3Service");
const Constant_1 = require("@src/core/Constant");
const VocabularyCardRepo_1 = require("@repositories/vocabulary-card/VocabularyCardRepo");
let VocabularySetService = class VocabularySetService {
    constructor() {
        this.get_all_public_sets = async (req, res) => {
            try {
                const { page_size, page_index, filter, name } = req.query;
                let data = {};
                const take = Number(page_size) || Constant_1.Constants.DEFAULT_PAGINATION.take;
                let skip = 0;
                if (Number(page_index) === 1) {
                    skip = 0;
                }
                else {
                    skip = (Number(page_index) - 1) * Number(page_size) || Constant_1.Constants.DEFAULT_PAGINATION.skip;
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
                    sets.forEach((set) => {
                        set.totalCards = set?.cards?.length;
                        set.cards.forEach((card) => {
                            return card.example = JSON.parse(card.example || "");
                        });
                        return set;
                    });
                    return new ApiResponse_1.SuccessResponse('Get all public sets successfully', {
                        sets,
                        count
                    }).send(res);
                }
                else {
                    return new ApiResponse_1.FailureMsgResponse("Empty!").send(res);
                }
            }
            catch (error) {
                console.log('error', error);
                return new ApiResponse_1.FailureMsgResponse('Internal Server Error ').send(res);
            }
        };
        this.get_my_sets = async (req, res) => {
            try {
                const userId = req.user.id;
                const sets = await this.setRepo.get_my_sets(userId);
                if (sets?.length) {
                    return new ApiResponse_1.SuccessResponse('Get my sets successfully', sets).send(res);
                }
                return new ApiResponse_1.FailureMsgResponse("Empty!").send(res);
            }
            catch (error) {
                return new ApiResponse_1.FailureMsgResponse('Internal Server Error ').send(res);
            }
        };
        this.getSet = async (req, res) => {
            try {
                const setId = req.params.id;
                const set = await this.setRepo.get_set_by_id(setId);
                if (set) {
                    return new ApiResponse_1.SuccessResponse('Get set successfully', set).send(res);
                }
                return new ApiResponse_1.FailureMsgResponse("Set not founded!").send(res);
            }
            catch (error) {
                return new ApiResponse_1.FailureResponse('Internal Server Error ', error).send(res);
            }
        };
        this.deleteSet = async (req, res) => {
            return res.json({ message: 'Delete set' });
        };
        this.create_update_Set_and_Cards = async (req, res) => {
            const setId = req?.params?.id;
            if (setId) {
                //update
                return this.edit_set_and_cards(req, res);
            }
            else {
                return this.create_Set(req, res);
            }
        };
        this.create_Set = async (req, res) => {
            try {
                const cards = [];
                const formData = req.body;
                const userId = req.user.id;
                const files = req.files;
                let image = null;
                for (let i = 0; formData[`card[${i}].term`]; i++) {
                    const term = formData[`card[${i}].term`];
                    const define = formData[`card[${i}].define`];
                    const example = formData[`card[${i}].example`];
                    files.forEach((file) => {
                        if (file.fieldname === `card[${i}].image`) {
                            image = file;
                        }
                    });
                    // ? if save to database not success, need to delete image from S3?
                    const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
                    cards.push({ term, define, image_url: image_url?.Location || "", example });
                    cards.push({ term, define, image_url: image_url || "", example });
                }
                const { set_name, set_description } = formData;
                const set_image = files.find((file) => file.fieldname === 'set_image');
                const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
                const set = { set_name, set_description, set_image_url: set_image_url?.Location || "" };
                await this.setRepo.create_new_set_and_cards(userId, set, cards);
                return new ApiResponse_1.SuccessMsgResponse('Create set successfully').send(res);
            }
            catch (error) {
                console.log('error', error);
                return new ApiResponse_1.FailureMsgResponse('Internal Server Error ').send(res);
            }
        };
        this.edit_set_and_cards = async (req, res) => {
            const errorCardAction = [];
            try {
                const setId = req?.params?.id;
                const formData = req.body;
                const files = req?.files;
                let image;
                const { set_name, set_description } = formData;
                const set_image = files.find((file) => file.fieldname === 'set_image');
                const set_image_url = set_image ? await this.s3Service.uploadFile(set_image) : null;
                const set = { set_name, set_description, set_image_url };
                for (let i = 0; formData[`card[${i}].term`]; i++) {
                    const term = formData[`card[${i}].term`];
                    const define = formData[`card[${i}].define`];
                    const cardFlag = formData[`card[${i}].flag`];
                    const cardId = formData[`card[${i}].id`];
                    const cardExample = formData[`card[${i}].example`];
                    files.forEach((file) => {
                        if (file.fieldname === `card[${i}].image`) {
                            image = file;
                        }
                    });
                    try {
                        const image_url = image ? await this.s3Service.uploadFile(image) : null; // Nếu có ảnh thì upload lên S3 và lấy url
                        switch (Number(cardFlag)) {
                            case Constant_1.Constants.CARD_FLAG.CREATE_MODE:
                                const new_card = await this.cardRepo.create_card(setId, {
                                    term: term,
                                    define: define,
                                    image: image_url,
                                    setId: setId,
                                    example: cardExample
                                });
                                if (!new_card) {
                                    errorCardAction.push(`Create card ${i} failed`);
                                }
                                break;
                            case Constant_1.Constants.CARD_FLAG.EDIT_MODE:
                                if (cardId) {
                                    const edit_card = await this.cardRepo.edit_card(cardId, {
                                        term: term,
                                        define: define,
                                        image: image_url,
                                        example: cardExample
                                    });
                                    if (!edit_card) {
                                        errorCardAction.push(`Edit card ${i} failed`);
                                    }
                                }
                                else {
                                    errorCardAction.push(`Edit card ${i} because card id is required`);
                                }
                                break;
                            case Constant_1.Constants.CARD_FLAG.DELETE_MODE:
                                if (cardId) {
                                    const delete_card = await this.cardRepo.delete_card(cardId);
                                    if (!delete_card) {
                                        errorCardAction.push(`Delete card ${i} failed`);
                                    }
                                }
                                else {
                                    errorCardAction.push(`Delete card ${i} because card id is required`);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    catch (error) {
                        errorCardAction.push(`Card ${i} failed because ${error}`);
                    }
                }
                await this.setRepo.edit_set_by_id(setId, set);
                return new ApiResponse_1.SuccessResponse('Edit set successfully', errorCardAction).send(res);
            }
            catch (error) {
                return new ApiResponse_1.FailureResponse('Internal Server Error ', errorCardAction).send(res);
            }
        };
        this.setRepo = typedi_1.Container.get(VocabularySetRepo_1.VocabularySetRepo);
        this.s3Service = typedi_1.Container.get(S3Service_1.S3Service);
        this.cardRepo = typedi_1.Container.get(VocabularyCardRepo_1.VocabularyCardRepo);
    }
};
VocabularySetService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], VocabularySetService);
exports.default = VocabularySetService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyCardRepo = void 0;
const data_source_1 = require("@src/data-source");
const Sets_1 = require("@src/entity/Sets");
const Cards_1 = require("@src/entity/Cards");
const typedi_1 = require("typedi");
let VocabularyCardRepo = class VocabularyCardRepo {
    constructor() {
        this.setDataSource = data_source_1.AppDataSource.getRepository(Sets_1.Sets);
        this.cardDataSource = data_source_1.AppDataSource.getRepository(Cards_1.Cards);
    }
    async create_card(setID, cards) {
        // return "create card successfully!";
        const newCard = new Cards_1.Cards();
        newCard.term = cards?.term;
        newCard.define = cards?.define;
        newCard.image = cards?.image;
        newCard.example = cards?.example;
        const set = await this.setDataSource.findOne({
            where: { id: setID },
            relations: ["user"]
        });
        if (!set) {
            return false;
        }
        newCard.set = set;
        newCard.created_by = set.user.email;
        await this.cardDataSource.save(newCard);
        return true;
    }
    async edit_card(cardId, cardData) {
        const updateCard = await this.cardDataSource.findOneBy({
            id: cardId
        });
        if (updateCard) {
            updateCard.term = cardData?.term ? cardData.term : updateCard.term;
            updateCard.define = cardData?.define ? cardData.define : updateCard.define;
            updateCard.image = cardData?.image ? cardData.image : updateCard.image;
            updateCard.updated_at = new Date();
            updateCard.example = cardData?.example ? cardData.example : updateCard.example;
            const result = await this.cardDataSource.save(updateCard);
            if (result) {
                return true;
            }
            return false;
        }
        return false;
    }
    async delete_card(cardId) {
        const result = await this.cardDataSource.delete({ id: cardId });
        if (result.affected) {
            return true;
        }
        return false;
    }
};
VocabularyCardRepo = __decorate([
    (0, typedi_1.Service)()
], VocabularyCardRepo);
exports.VocabularyCardRepo = VocabularyCardRepo;

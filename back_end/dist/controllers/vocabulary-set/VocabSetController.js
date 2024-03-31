"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const VocabularySetService_1 = __importDefault(require("@services/vocabulary-set/VocabularySetService"));
class VocabularySetController {
    constructor() {
        this.get_all_public_sets = async (req, res) => {
            return this.service.get_all_public_sets(req, res);
        };
        this.get_my_sets = async (req, res) => {
            return this.service.get_my_sets(req, res);
        };
        this.getSet = async (req, res) => {
            return this.service.getSet(req, res);
        };
        // Change 'req' type from 'Request' to 'data' after verifyToken middleware, (user id)
        this.createSet = async (req, res) => {
            return this.service.create_update_Set_and_Cards(req, res);
        };
        this.updateSet = async (req, res) => {
            return this.service.create_update_Set_and_Cards(req, res);
        };
        this.deleteSet = async (req, res) => {
            return this.service.deleteSet(req, res);
        };
        this.service = typedi_1.Container.get(VocabularySetService_1.default);
    }
}
exports.default = VocabularySetController;

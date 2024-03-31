"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularySetRepo = void 0;
const data_source_1 = require("@src/data-source");
const typedi_1 = require("typedi");
const Sets_1 = require("@src/entity/Sets");
const Cards_1 = require("@src/entity/Cards");
const User_1 = require("@src/entity/User");
let VocabularySetRepo = class VocabularySetRepo {
    constructor() {
        this.setDataSource = data_source_1.AppDataSource.getRepository(Sets_1.Sets);
        this.cardDataSource = data_source_1.AppDataSource.getRepository(Cards_1.Cards);
        this.userDataSource = data_source_1.AppDataSource.getRepository(User_1.User);
        this.create_new_set_and_cards = async (userId, set, cards) => {
            const owner = await this.userDataSource.findOne({ where: { id: userId }, relations: ["sets"] });
            if (owner) {
                const { set_name, set_description, set_image_url } = set;
                const newSet = new Sets_1.Sets();
                newSet.name = set_name;
                newSet.description = set_description;
                newSet.image = set_image_url;
                newSet.created_by = owner?.email;
                newSet.user = owner;
                if (!newSet.cards) {
                    newSet.cards = [];
                }
                for (let i = 0; i < cards.length; i++) {
                    const card = new Cards_1.Cards();
                    card.term = cards[i].term;
                    card.define = cards[i].define;
                    card.image = cards[i].image_url;
                    card.example = cards[i].example;
                    card.created_by = owner?.email;
                    newSet.cards.push(card);
                }
                await data_source_1.AppDataSource.transaction(async (manager) => {
                    await manager.save(newSet?.cards);
                    await manager.save(newSet);
                    owner.sets.push(newSet);
                    await manager.save(owner);
                });
                return true;
            }
            return false;
        };
        this.edit_set_by_id = async (setId, set) => {
            const updateSet = await this.setDataSource.findOne({
                where: {
                    id: setId
                }
            });
            if (updateSet) {
                updateSet.name = set.set_name;
                updateSet.description = set.set_description;
                updateSet.image = set.set_image_url;
                await this.setDataSource.save(updateSet);
                return true;
            }
            return false;
        };
    }
    get_all_public_sets(data) {
        const { take, skip, filter, name, sortBy } = data;
        let order = {};
        if (sortBy === "setName") {
            order.name = filter === "asc" ? "ASC" : "DESC";
        }
        else if (sortBy === "createdDate") {
            order.created_at = filter === "latest" ? "DESC" : "ASC";
        }
        return this.setDataSource.findAndCount({
            where: {
                name: name
            },
            order: order,
            take: take,
            skip: skip,
            relations: ["cards"]
        });
    }
    get_my_sets(userId) {
        return this.setDataSource.find({
            relations: ["cards"],
            where: {
                user: {
                    id: userId
                }
            }
        });
    }
    get_set_by_id(setId) {
        return this.setDataSource.findOne({ where: { id: setId }, relations: ["cards", "user"] });
    }
};
VocabularySetRepo = __decorate([
    (0, typedi_1.Service)()
], VocabularySetRepo);
exports.VocabularySetRepo = VocabularySetRepo;

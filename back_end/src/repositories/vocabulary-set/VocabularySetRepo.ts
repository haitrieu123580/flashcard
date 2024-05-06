import { IVocabularySetRepo } from "./IVocabularySetRepo";
import { AppDataSource } from "@src/data-source";
import { Service } from "typedi";
import { Sets } from "@src/entity/Sets";
import { Cards } from "@src/entity/Cards";
import { User } from "@src/entity/User";
import { ILike } from "typeorm"
import { isWhiteSpaceLike } from "typescript";

@Service()
export class VocabularySetRepo implements IVocabularySetRepo {
    private setDataSource = AppDataSource.getRepository(Sets)
    private userDataSource = AppDataSource.getRepository(User)

    create_new_set_and_cards = async (userId: string, set: any, cards: any): Promise<any> => {
        const owner = await this.userDataSource.findOne(
            { where: { id: userId }, relations: ["sets"] }
        );

        if (owner) {
            const { set_name, set_description, set_image_url, is_public } = set;
            const newSet = new Sets();
            newSet.name = set_name;
            newSet.description = set_description;
            newSet.image = set_image_url;
            newSet.created_by = owner?.email;
            newSet.user = owner;
            newSet.is_public = is_public
            if (!newSet.cards) {
                newSet.cards = [];
            }

            for (let i = 0; i < cards.length; i++) {
                const card = new Cards();
                card.term = cards[i].term;
                card.define = cards[i].define;
                card.image = cards[i].image_url;
                card.example = cards[i].example;
                card.created_by = owner?.email;
                newSet.cards.push(card);
            }
            await AppDataSource.transaction(async manager => {
                await manager.save(newSet?.cards);
                await manager.save(newSet);
                owner.sets.push(newSet);
                await manager.save(owner);
            });


            return true;
        }
        return false;
    }

    get_all_public_sets(data: any): Promise<any> {
        const { take, skip, filter, name, sortBy } = data;
        let order: any = {};
        if (sortBy === "setName") {
            order.name = filter === "asc" ? "ASC" : "DESC";
        } else if (sortBy === "createdDate") {
            order.created_at = filter === "latest" ? "DESC" : "ASC";
        }

        return this.setDataSource.findAndCount({
            where: {
                name: name ? ILike(name) : undefined,
                is_public: true
            },
            order: order,
            take: take,
            skip: skip,
            relations: ["cards", "questions"]
        });
    }
    get_my_sets(userId: string): Promise<any> {

        return this.setDataSource.find(
            {
                relations: ["cards"],
                where: {
                    user: {
                        id: userId
                    }
                }
            });
    }

    get_set_by_id(setId: string): Promise<any> {
        return this.setDataSource.findOne({ where: { id: setId }, relations: ["cards", "user"] });
    }

    edit_set_by_id = async (setId: string, set: any): Promise<any> => {
        const updateSet = await this.setDataSource.findOne({
            where: {
                id: setId
            }
        })
        if (updateSet) {
            updateSet.name = set.set_name;
            updateSet.description = set.set_description;
            updateSet.image = set.set_image_url;
            updateSet.updated_at = new Date();
            await this.setDataSource.save(updateSet);
            return true;
        }
        return false;
    }

    deleteSetById(setId: string): Promise<any> {
        return this.setDataSource.delete({
            id: setId
        })
    }

    isExistSet(setId: string): Promise<boolean> {
        return this.setDataSource.findOne({ where: { id: setId } }).then(set => {
            return set ? true : false;
        });
    }

    createSet = async (set: any): Promise<any> => {
        const result = await this.setDataSource.save(set);
        return result;
    }
}

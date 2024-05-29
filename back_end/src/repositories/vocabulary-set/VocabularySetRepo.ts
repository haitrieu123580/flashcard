import { IVocabularySetRepo } from "./IVocabularySetRepo";
import { AppDataSource } from "@src/data-source";
import { Service } from "typedi";
import { Sets } from "@src/entity/Sets";
import { Cards } from "@src/entity/Cards";
import { User } from "@src/entity/User";
import { ILike } from "typeorm"
import { CreateNewSetData, createNewCardData } from "@src/dto/set";
import { Constants } from "@src/core/Constant";
@Service()
export class VocabularySetRepo implements IVocabularySetRepo {
    private setDataSource = AppDataSource.getRepository(Sets)
    private userDataSource = AppDataSource.getRepository(User)

    create_new_set_and_cards = async (userId: string, set: CreateNewSetData, cards: createNewCardData[] | undefined): Promise<any> => {
        const owner = await this.userDataSource.findOne(
            { where: { id: userId }, relations: ["sets"] }
        );

        if (owner) {
            // const { set_name, set_description, set_image_url, is_public } = set;
            const newSet = new Sets();
            newSet.name = set.name;
            newSet.description = set?.description || "";
            newSet.image = set.image || "";
            newSet.created_by = owner?.email;
            newSet.user = owner;
            newSet.is_public = set.is_public
            if (!newSet.cards) {
                newSet.cards = [];
            }
            if (cards) {
                for (let i = 0; i < cards.length; i++) {
                    const card = new Cards();
                    card.term = cards[i].term;
                    card.define = cards[i].define;
                    card.image = cards[i]?.image || "";
                    card.example = cards[i].example;
                    card.created_by = owner?.email;
                    newSet.cards.push(card);
                }
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

    get_all_public_sets(data: any): Promise<[Sets[], number]> {
        const { take, skip, filter, name, sortBy } = data;
        let order: any = {};
        if (sortBy === "setName") {
            order.name = String(filter).toLowerCase() === "asc" ? "ASC" : "DESC";
        } else if (sortBy === "createdDate") {
            order.created_at = String(filter).toLowerCase() === "latest" ? "DESC" : "ASC";
        }

        return this.setDataSource.findAndCount({
            where: {
                name: name ? ILike(name) : undefined,
                is_public: true
            },
            order: order,
            take: take,
            skip: skip,
            relations: ["cards", "testKits"]
        });
    }

    get_set_by_id(setId: string): Promise<Sets | null> {
        return this.setDataSource.findOne({ where: { id: setId }, relations: ["cards", "user", "questions", "testKits", "testKits.questions"] });
    }

    edit_set = async (set: Sets): Promise<Sets> => {
        set.updated_at = new Date();
        return this.setDataSource.save(set);
    }

    deleteSetById(setId: string): Promise<any> {
        return this.setDataSource.delete({
            id: setId
        })
    }

    createSet = (set: CreateNewSetData | Sets): Promise<Sets | null> => {
        return this.setDataSource.save(set);
        // return result;
    }

    getSetsByStatus(status: string): Promise<[Sets[], number]> {
        return this.setDataSource.findAndCount({
            where: {
                status: status,
            }
        });
    }
}

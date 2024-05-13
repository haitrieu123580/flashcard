import { IVocabularyCardRepo } from "./IVocabularyCardRepo";
import { AppDataSource } from "@src/data-source";
import { Sets } from "@src/entity/Sets";
import { Cards } from "@src/entity/Cards";
import { Service } from "typedi";

@Service()
export class VocabularyCardRepo implements IVocabularyCardRepo {
    private setDataSource = AppDataSource.getRepository(Sets);
    private cardDataSource = AppDataSource.getRepository(Cards);

    async create_card(setID: any, card: any): Promise<any> {
        const newCard = new Cards();
        newCard.term = card?.term;
        newCard.define = card?.define;
        newCard.image = card?.image;
        newCard.example = card?.example;
        const set = await this.setDataSource.findOne({
            where: { id: setID },
            relations: ["user"]
        })
        if (!set) { return false }
        newCard.set = set;
        newCard.created_by = set.user.email;
        return await this.cardDataSource.save(newCard);
    }

    async edit_card(cardId: string, cardData: any): Promise<boolean> {
        const updateCard = await this.cardDataSource.findOneBy({
            id: cardId
        })
        if (updateCard) {
            updateCard.term = cardData?.term ? cardData.term : updateCard.term;
            updateCard.define = cardData?.define ? cardData.define : updateCard.define;
            updateCard.image = cardData?.image;
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

    async delete_card(cardId: string): Promise<any> {
        const result = await this.cardDataSource.delete({ id: cardId });
        if (result.affected) {
            return true;
        }
        return false;
    }

    async isExistCard(id: string): Promise<boolean> {
        const card = await this.cardDataSource.findOneBy({
            id: id
        })
        if (card) {
            return true;
        }
        return false;
    }

    async getCardById(id: string): Promise<Cards | null> {
        const card = await this.cardDataSource.findOne({
            where: {
                id: id
            },
            relations: ["set"]
        })
        return card
    }
}

import { User } from '@entity/User';
import { IUserSetsRepo } from './IUserSetsRepo';
import { AppDataSource } from "../../data-source"
import { Service } from "typedi";
import { Sets } from "@entity/Sets";
import { Cards } from '@src/entity/Cards';
@Service()
export class UserSetsRepo implements IUserSetsRepo {
    private userDataSource = AppDataSource.getRepository(User)
    private setDataSource = AppDataSource.getRepository(Sets)
    async getUserSetsList(userId: string): Promise<any> {
        return await this.setDataSource.findAndCount({
            where: {
                user: {
                    id: userId
                }
            },
            relations: [
                "user",
                "cards"
            ]
        })
    }
    addCardToSet = async (setId: string, cardId: string): Promise<any> => {
        const set = await this.setDataSource.findOne({
            where: {
                id: setId,

            },
            relations: ["cards"]
        });
        if (set) {
            const card = await AppDataSource.getRepository(Cards).findOne({
                where: {
                    id: cardId
                }
            });
            if (card) {
                set.cards.push(card);
                await this.setDataSource.save(set);
                return true;
            }
        }
        return false;
    }
}


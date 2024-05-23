import { User } from '@entity/User';
import { IUserSetsRepo } from './IUserSetsRepo';
import { AppDataSource } from "../../data-source"
import { Service } from "typedi";
import { Sets } from "@entity/Sets";
import { Cards } from '@src/entity/Cards';
import { UserProgress } from '@src/entity/UserProgress';
@Service()
export class UserSetsRepo implements IUserSetsRepo {
    private userDataSource = AppDataSource.getRepository(User)
    private setDataSource = AppDataSource.getRepository(Sets)
    private progressDataSource = AppDataSource.getRepository(UserProgress)
    async getUserSetsList(userId: string): Promise<[Sets[], number]> {
        return this.setDataSource.findAndCount({
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
    addCardToSet = async (set: Sets, card: Cards): Promise<any> => {
        let copiedCard = new Cards();
        copiedCard.term = card.term;
        copiedCard.define = card.define;
        copiedCard.image = card.image;
        copiedCard.example = card.example;
        copiedCard.pronounciation = card.pronounciation;
        copiedCard.set = set;
        copiedCard.created_by = set.user.email;
        if (!set.cards) {
            set.cards = [];
        }
        set.cards.push(copiedCard);
        return AppDataSource.transaction(async manager => {
            await manager.save(set);
            await manager.save(copiedCard);
        });
    }

    async getUserProgress(userId: string, setId: string) {
        const progress = await this.progressDataSource.find({
            relations: ['cards'],
            where: {
                user: {
                    id: userId,
                },
                set: {
                    id: setId
                }
            }
        })


        return progress.map((p: any) => ({
            flashcardId: p.flashcard.id,
            term: p.flashcard.term,
            definition: p.flashcard.definition,
            isKnown: p.isKnown,
            lastReviewedAt: p.lastReviewedAt,
            reviewCount: p.reviewCount
        }));
    }
}


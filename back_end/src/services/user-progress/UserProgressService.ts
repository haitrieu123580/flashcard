import { Service } from "typedi";
import { AppDataSource } from "../../data-source"
import { NotFoundError } from '@src/core/ApiError';
import { TestResult } from '@entity/TestResult';
import { TestQuestion } from '@entity/TestQuestion';
import { Tests } from '@entity/Tests';
import { UserProgress } from '@entity/UserProgress';
import { Cards } from '@entity/Cards';
import { User } from "@src/entity/User";
import { Sets } from "@src/entity/Sets";
import { Constants } from "@src/core/Constant";
@Service()
export class UserProgressService {
    private userRepo;
    private setRepo;
    private cardRepo;
    private userProgressRepo;
    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.setRepo = AppDataSource.getRepository(Sets);
        this.cardRepo = AppDataSource.getRepository(Cards);
        this.userProgressRepo = AppDataSource.getRepository(UserProgress);
    }

    updateUserProgress = async (data: any): Promise<any> => {
        const { userId, setId, cardId, status } = data;
        if (!userId || !setId || !cardId || !status) { throw new NotFoundError('Invalid data'); }
        const set = await this.setRepo.findOneOrFail(
            { where: { id: setId } }
        );
        if (!set) { throw new NotFoundError('Set not found'); }
        const card = await this.cardRepo.findOneOrFail({ where: { id: cardId } });
        if (!card) { throw new NotFoundError('Card not found'); }
        const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
        if (!user) { throw new NotFoundError('User not found'); }
        let userProgress = await this.userProgressRepo.findOne({
            where: {
                user: {
                    id: userId
                },
                set: {
                    id: setId
                },
                card: {
                    id: cardId
                }
            }
        });
        if (!userProgress) {
            const newUserProgress = new UserProgress();
            newUserProgress.user = user;
            newUserProgress.set = set;
            newUserProgress.card = card;
            newUserProgress.status = status;
            newUserProgress.lastReview = new Date();
            await this.userProgressRepo.save(newUserProgress);
            userProgress = newUserProgress;
        } else {
            userProgress.status = status;
            userProgress.lastReview = new Date();
            await this.userProgressRepo.save([userProgress]);
        }
        return userProgress;
    }

    getUserProgress = async (userId: string): Promise<any> => {
        const progressBySet = await this.userProgressRepo
            .createQueryBuilder('userProgress')
            .select('userProgress.setId')
            .addSelect('COUNT(userProgress.setId)', 'progressCount')
            .where('userProgress.userId = :userId', { userId })
            .groupBy('userProgress.setId')
            .getRawMany();
        const progressPromises = progressBySet.map(async (data) => {
            const set = await this.setRepo.findOneOrFail({ where: { id: data.setId }, relations: ['cards', "user"] });
            const [knowCards, knowCardsCount] = await this.userProgressRepo.findAndCount({
                where: {
                    user: {
                        id: userId
                    },
                    set: {
                        id: data.setId
                    },
                    status: 'known',
                }
            })
            const totalCards = set.cards.length;
            const progressPercentage = (knowCardsCount / totalCards) * 100;

            return {
                knowCardsCount,
                totalCards,
                progressPercentage: Math.floor(progressPercentage),
                set: {
                    ...set,
                    mySet: set?.user?.id === userId
                },
                // mySet: set.user.id === userId
            };
        });
        const progress = await Promise.all(progressPromises);
        progress.sort((a, b) => a.progressPercentage - b.progressPercentage);
        return progress;
    }

    getUserProgressBySetId = async (userId: string, setId: string): Promise<any> => {

        const set = await this.setRepo.findOneOrFail({ where: { id: setId }, relations: ['cards'] });
        const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
        if (!set) { throw new NotFoundError('Set not found'); }
        if (!user) { throw new NotFoundError('User not found'); }

        const [knowCards, knowCardsCount] = await this.userProgressRepo.findAndCount({
            where: {
                user: {
                    id: userId
                },
                set: {
                    id: setId
                },
                status: 'known',
            },
            relations: ['card']
        })
        const totalCards = set.cards.length;
        const progressPercentage = (knowCardsCount / totalCards) * 100;
        let studiedCards = [];
        if (knowCards.length > 0) {
            const cardIds = knowCards.map(progress => progress.card.id);
            studiedCards.push(...cardIds);
        }
        return {
            studiedCards,
            knowCardsCount,
            progressPercentage: Math.floor(progressPercentage),
        };
    }
}   
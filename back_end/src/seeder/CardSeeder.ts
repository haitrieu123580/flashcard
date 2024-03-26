import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { Cards } from '../entity/Cards'
import { Sets } from '../entity/Sets'

export class CardsSeeder implements Seeder {
    async run(
        dataSource: DataSource
    ): Promise<void> {
        const setRepository = dataSource.getRepository(Sets)
        const cardRepository = dataSource.getRepository(Cards)
        const set_1 = await setRepository.findOne({
            where: {
                name: 'Set 1',
            },
            relations: ["cards"]
        })
        const cardSet1Data = [
            {
                term: "Term 1",
                define: "Define 1",
                set: set_1,
                cread_by: "Seeder",
                created_at: new Date()
            },
            {
                term: "Term 2",
                define: "Define 2",
                set: set_1,
                cread_by: "Seeder",
                created_at: new Date()
            },
        ]
        for (const card of cardSet1Data) {
            const cardData = new Cards();
            cardData.term = card.term;
            cardData.define = card.define;
            if (card.set) {
                cardData.set = card.set;
            }
            cardData.created_by = card.cread_by;
            try {
                await cardRepository.save(cardData)
            } catch (error) {
                console.log(error)
            }
        }

    }
}
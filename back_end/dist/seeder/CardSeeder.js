"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsSeeder = void 0;
const Cards_1 = require("../entity/Cards");
const Sets_1 = require("../entity/Sets");
class CardsSeeder {
    async run(dataSource) {
        const setRepository = dataSource.getRepository(Sets_1.Sets);
        const cardRepository = dataSource.getRepository(Cards_1.Cards);
        const set_1 = await setRepository.findOne({
            where: {
                name: 'Set 1',
            },
            relations: ["cards"]
        });
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
        ];
        for (const card of cardSet1Data) {
            const cardData = new Cards_1.Cards();
            cardData.term = card.term;
            cardData.define = card.define;
            if (card.set) {
                cardData.set = card.set;
            }
            cardData.created_by = card.cread_by;
            try {
                await cardRepository.save(cardData);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.CardsSeeder = CardsSeeder;

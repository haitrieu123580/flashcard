"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSeeder = void 0;
const Sets_1 = require("../entity/Sets");
const User_1 = require("../entity/User");
class SetSeeder {
    async run(dataSource, factoryManager) {
        const setRepository = dataSource.getRepository(Sets_1.Sets);
        const userRepository = dataSource.getRepository(User_1.User);
        const setsData = [
            {
                name: "Set 1",
                description: "This is set 1",
            },
            {
                name: "Set 2",
                description: "This is set 2",
            },
            {
                name: "Set 3",
                description: "This is set 3",
            },
            {
                name: "Set 4",
                description: "This is set 4",
            }
        ];
        for (const set of setsData) {
            const newSet = {
                name: '',
                description: '',
                created_by: 'Seeder',
                created_at: new Date(),
            };
            newSet.name = set?.name;
            newSet.description = set?.description;
            newSet.created_by = "seeder";
            try {
                const result = setRepository.create(newSet);
                const result_main = await setRepository.save(result);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.SetSeeder = SetSeeder;

import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Sets } from '../entity/Sets'
import { User } from '../entity/User';
import { Constants } from '../core/Constant'

export class SetSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const setRepository = dataSource.getRepository(Sets)
        const userRepository = dataSource.getRepository(User)
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
        ]
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
            } catch (error) {
                console.log(error);
            }
        }
    }
}
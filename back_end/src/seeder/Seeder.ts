import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import { UserSeeder } from './UserSeeder'
import { SetSeeder } from './SetSeeder'
export class MainSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        await runSeeder(dataSource, UserSeeder)
        await runSeeder(dataSource, SetSeeder)
    }
}
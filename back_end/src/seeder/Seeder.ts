import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';

import { AdvancedSetSeeder } from './AdvancedSets';
import { SetSeeder } from './SetSeeder';
import { UserSeeder } from './UserSeeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, SetSeeder);
    // await runSeeder(dataSource, AdvancedSetSeeder)
  }
}

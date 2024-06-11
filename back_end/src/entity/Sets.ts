import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Constants } from '@src/core/Constant';

import { BaseEntity } from './BaseEntity';
import { Cards } from './Cards';
import { TestKits } from './TestKit';
import { Tests } from './Tests';
import { User } from './User';
import { UserProgress } from './UserProgress';

@Entity()
export class Sets extends BaseEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User, (user) => user.sets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    nullable: true,
    default: false,
  })
  is_public: boolean;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: true,
  })
  level: number;

  @OneToMany(() => Cards, (cards) => cards.set, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  cards: Cards[];

  @Column({
    nullable: true,
  })
  image: string;

  @OneToMany(() => Tests, (tests) => tests.set, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  tests: Tests[];

  @OneToMany(() => UserProgress, (process) => process.set, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  progresses: UserProgress[];

  @OneToMany(() => TestKits, (kits) => kits.set, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  testKits: TestKits[];
}

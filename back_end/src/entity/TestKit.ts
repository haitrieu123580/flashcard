import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { Sets } from './Sets';
import { TestQuestion } from './TestQuestion';

@Entity()
export class TestKits extends BaseEntity {
  @ManyToOne(() => Sets, (set) => set.testKits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  set: Sets;

  @OneToMany(() => TestQuestion, (testQuestion) => testQuestion.testKit, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  questions: TestQuestion[];

  @Column({
    nullable: true,
  })
  level: number;
}

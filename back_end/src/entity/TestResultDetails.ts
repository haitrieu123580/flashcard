import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { TestQuestion } from './TestQuestion';
import { Tests } from './Tests';
import { User } from './User';

@Entity()
export class TestResultDetails extends BaseEntity {
  @ManyToOne(() => Tests, (test) => test.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  test: Tests;

  @ManyToOne(() => TestQuestion, (question) => question.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  question: TestQuestion;

  @Column({
    nullable: true,
  })
  userAnswer: string;

  @Column({
    nullable: true,
  })
  isCorrect: boolean;
}

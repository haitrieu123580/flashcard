import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { TestQuestion } from './TestQuestion';
import { BaseEntity } from './BaseEntity';

@Entity()
export class UserAnswer extends BaseEntity {

    @ManyToOne(() => User, user => user.answers)
    user: User;

    @ManyToOne(() => TestQuestion, question => question.answers)
    question: TestQuestion;

    @Column()
    isCorrect: boolean;
}

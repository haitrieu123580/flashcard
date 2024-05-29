import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Tests } from './Tests';
import { BaseEntity } from './BaseEntity';
import { TestQuestion } from './TestQuestion';

@Entity()
export class TestResultDetails extends BaseEntity {

    @ManyToOne(() => Tests, test => test.results, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    test: Tests;

    @ManyToOne(() => TestQuestion, question => question.details, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    question: TestQuestion;

    @Column({
        nullable: true
    })
    userAnswer: string;

    @Column({
        nullable: true
    })
    isCorrect: boolean;
}

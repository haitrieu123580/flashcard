import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tests } from './Tests';
import { Cards } from './Cards';
import { BaseEntity } from './BaseEntity';
import { UserAnswer } from './UserAnswer';

@Entity()
export class TestQuestion extends BaseEntity {

    @ManyToOne(() => Tests, test => test.id)
    @JoinColumn()
    test: Tests;

    @ManyToOne(() => Cards, card => card.id)
    @JoinColumn()
    card: Cards;

    @Column(
        {
            nullable: true,
        }
    )
    questionType: 'term' | 'definition' | 'image' | string;

    @Column(
        {
            nullable: true,
        }
    )
    questionText: string;

    @Column(
        {
            nullable: true,
        }
    )
    correctAnswer: string;

    @Column({
        nullable: true,
        type: 'jsonb',
    })
    options: string[];


    @ManyToOne(() => UserAnswer, answers => answers.id)
    @JoinColumn()
    answers: UserAnswer;
}

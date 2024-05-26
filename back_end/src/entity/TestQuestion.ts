import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tests } from './Tests';
import { Cards } from './Cards';
import { BaseEntity } from './BaseEntity';

@Entity()
export class TestQuestion extends BaseEntity {

    @ManyToOne(() => Tests, test => test.id, {
        onDelete: "CASCADE"
    })
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

    @Column({
        nullable: true,
        default: false,
    })
    isCorrect: boolean;

    @Column({
        nullable: true,
    })
    userAnswer: string;
}

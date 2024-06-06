import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tests } from './Tests';
import { Cards } from './Cards';
import { BaseEntity } from './BaseEntity';
import { TestResultDetails } from './TestResultDetails';
import { TestKits } from './TestKit';

@Entity()
export class TestQuestion extends BaseEntity {

    @ManyToOne(() => Tests, test => test.id, {
        onDelete: "CASCADE",
        nullable: true,
    })
    @JoinColumn()
    test: Tests;


    @Column(
        {
            nullable: true,
        }
    )
    questionType: 'term' | 'definition' | 'image' | 'written' | string;

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

    @Column(
        {
            nullable: true,
        }
    )
    explain: string;

    @Column({
        nullable: true,
        type: 'jsonb',
    })
    options: string[];

    @OneToMany(() => TestResultDetails, details => details.question, {
        onDelete: "SET NULL"
    })
    details: TestResultDetails[];

    @ManyToOne(() => TestKits, testKit => testKit.questions, {
        onDelete: "SET NULL",
        nullable: true,
    })
    @JoinColumn()
    testKit: TestKits;
}

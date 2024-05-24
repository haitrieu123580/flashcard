import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TestResult } from './TestResult';
import { TestQuestion } from './TestQuestion';
import { BaseEntity } from './BaseEntity';

@Entity()
export class TestResultDetail extends BaseEntity {

    @ManyToOne(() => TestResult, testResult => testResult.details)
    testResult: TestResult;

    @ManyToOne(() => TestQuestion, testQuestion => testQuestion.id)
    question: TestQuestion;

    @Column()
    isCorrect: boolean;
}

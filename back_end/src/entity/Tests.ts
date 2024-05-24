import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Sets } from './Sets';
import { TestQuestion } from './TestQuestion';
import { TestResult } from './TestResult';
import { BaseEntity } from './BaseEntity';
@Entity()
export class Tests extends BaseEntity {

    @ManyToOne(() => Sets, set => set.tests)
    @JoinColumn()
    set: Sets;

    @OneToMany(() => TestQuestion, testQuestion => testQuestion.test)
    @JoinColumn()
    questions: TestQuestion[];

    @OneToMany(() => TestResult, testResult => testResult.test)
    @JoinColumn()
    results: TestResult[];
}

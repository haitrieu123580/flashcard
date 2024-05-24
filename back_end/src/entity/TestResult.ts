import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Tests } from './Tests';
import { BaseEntity } from './BaseEntity';
import { TestResultDetail } from './TestResultDetail';

@Entity()
export class TestResult extends BaseEntity {

    @ManyToOne(() => User, user => user.testResults)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Tests, test => test.results)
    @JoinColumn()
    test: Tests;

    @Column()
    score: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    completedAt: Date;

    @OneToMany(() => TestResultDetail, detail => detail.testResult)
    details: TestResultDetail[];
}

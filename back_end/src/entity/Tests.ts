import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Sets } from './Sets';
import { TestQuestion } from './TestQuestion';
import { TestResultDetails } from './TestResultDetails';
import { BaseEntity } from './BaseEntity';
import { User } from "./User";
@Entity()
export class Tests extends BaseEntity {

    @ManyToOne(() => User, user => user.test, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Sets, set => set.tests, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    set: Sets;

    @OneToMany(() => TestQuestion, testQuestion => testQuestion.test, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    questions: TestQuestion[];

    @Column({
        nullable: true
    })
    score: number;

    @Column({
        nullable: true
    })
    level: number;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;

    @OneToMany(() => TestResultDetails, results => results.test, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    results: TestResultDetails[];
}

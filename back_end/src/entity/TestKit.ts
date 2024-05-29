import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Sets } from './Sets';
import { TestQuestion } from './TestQuestion';
import { BaseEntity } from './BaseEntity';

@Entity()
export class TestKits extends BaseEntity {

    @ManyToOne(() => Sets, set => set.testKits, {
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
    level: number;
}

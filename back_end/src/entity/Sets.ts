import { Entity, Column, Generated, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
import { Questions } from "./Questions"
import { Constants } from "@src/core/Constant"
import { Tests } from "./Tests"
import { UserProgress } from "./UserProgress"
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
export class Sets extends BaseEntity {

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @ManyToOne(() => User, user => user.sets, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User;

    @Column({
        nullable: true,
        default: false,
    })
    is_public: boolean;

    @Column({
        nullable: true,
    })
    status: string;

    @Column({
        nullable: true,
        default: 1,
    })
    level: number;

    @OneToMany(() => Cards, cards => cards.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    cards: Cards[];

    @Column({
        nullable: true
    })
    image: string;


    @OneToMany(() => Questions, questions => questions.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    questions: Questions[];


    @OneToMany(() => Tests, tests => tests.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    tests: Tests[];

    @OneToMany(() => UserProgress, progresses => progresses.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    progresses: UserProgress[];
}

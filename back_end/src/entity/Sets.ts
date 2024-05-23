import { Entity, Column, Generated, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
import { Questions } from "./Questions"
import { Constants } from "@src/core/Constant"
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
}

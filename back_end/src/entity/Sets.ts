import { Entity, Column, Generated, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
import { Questions } from "./Questions"
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

    // todo: change set -> sets
    @ManyToMany(() => Cards, {
        onDelete: "CASCADE"
    })
    @JoinTable()
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

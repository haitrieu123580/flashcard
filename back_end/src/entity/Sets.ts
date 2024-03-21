import { Entity, Column, Generated, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
@Entity()
export class Sets extends BaseEntity {

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    description: string;

    @Column({
        nullable: false
    })
    isPublic: boolean;

    @Column({
        nullable: false
    })
    topic: string;

    @ManyToOne(() => User, user => user.sets, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => Cards, card => card.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    cards: Cards[];
}

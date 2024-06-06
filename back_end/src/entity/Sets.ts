import { Entity, Column, Generated, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
import { Constants } from "@src/core/Constant"
import { Tests } from "./Tests"
import { UserProgress } from "./UserProgress"
import { TestKits } from "./TestKit"

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

    @OneToMany(() => Tests, tests => tests.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    tests: Tests[];


    @OneToMany(() => UserProgress, process => process.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    progresses: UserProgress[]

    @OneToMany(() => TestKits, kits => kits.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    testKits: TestKits[]

}

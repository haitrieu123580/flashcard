import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Sets } from "./Sets"
@Entity()
export class Cards extends BaseEntity {

    @Column({
        nullable: false
    })
    term: string;

    @Column({
        nullable: false
    })
    define: string;

    @Column({
        nullable: true
    })
    image: string;

    @Column({
        nullable: true,
        type: 'jsonb',
    })
    example: { sentence: string, translation: string }[];

    @Column({
        nullable: true
    })
    pronounciation: string;

    @ManyToOne(() => Sets, set => set.cards, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    set: Sets;
}

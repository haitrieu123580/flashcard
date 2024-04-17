import { BaseEntity } from "./BaseEntity";
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Sets } from "./Sets"

@Entity()
export class Questions extends BaseEntity {
    @Column({
        nullable: false
    })
    question: string;

    @Column({
        nullable: true,
        type: 'jsonb',
    })
    answers: string[];;

    @Column({
        nullable: false
    })
    correct_answer: string;

    @ManyToOne(() => Sets, set => set.questions, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    set: Sets;
}
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Sets } from "./Sets"
import { UserProgress } from './UserProgress';
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
    example: string | { sentence: string, translation: string }[];

    @Column({
        nullable: true
    })
    pronounciation: string;

    @ManyToOne(() => Sets, set => set.cards, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    set: Sets;

    @OneToMany(() => UserProgress, progress => progress.card, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    progresses: UserProgress[]
}

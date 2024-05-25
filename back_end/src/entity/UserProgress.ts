import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, OneToOne } from 'typeorm';
import { User } from './User';
import { Sets } from './Sets';
import { BaseEntity } from './BaseEntity';
import { Cards } from './Cards';

@Entity()
// @Unique(['user', 'sets'])
export class UserProgress extends BaseEntity {

    @ManyToOne(() => User, user => user.progresses, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })
    user: User;

    @ManyToOne(() => Sets, set => set.progresses, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })
    set: Sets;


    @ManyToOne(() => Cards, card => card.progresses, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })
    card: Cards;

    @Column({
        default: 'unknown'
    })
    status: 'unknown' | 'known' | 'review';

    @Column(
        { nullable: true }
    )
    lastReview: Date;

    // @Column({ type: 'float', default: 0 })
    // progress: number;

    // @Column({ type: 'float', default: 0 })
    // totalLearnedCards: number;

    // @Column({ type: 'float', default: 0 })
    // totalCards: number;
}

import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { User } from "./User"
import { Cards } from "./Cards"
import { Sets } from "./Sets";

@Entity()
export class UserProgress extends BaseEntity {

    @ManyToOne(() => User, user => user.progress, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Cards, card => card.progress, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    card: Cards;

    @ManyToOne(() => Sets, set => set.id)
    set: Sets;

    @Column({ default: false })
    isKnown: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastReviewedAt: Date;

    @Column({ default: 0 })
    reviewCount: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from './User';
import { Sets } from './Sets';
import { BaseEntity } from './BaseEntity';

@Entity()
// @Unique(['user', 'sets'])
export class UserProgress extends BaseEntity {

    @ManyToOne(() => User, user => user.progresses)
    user: User;

    @ManyToOne(() => Sets, set => set.progresses)
    set: Sets;

    @Column({ type: 'float', default: 0 })
    progress: number;
}

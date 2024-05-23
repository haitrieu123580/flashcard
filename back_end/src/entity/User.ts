import { Entity, Column, Unique, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { PasswordResetOtps } from "./PasswordResetOtps"
import { Sets } from "./Sets"
import { UserProgress } from "./UserProgress"
import { Constants } from "../core/Constant"
@Entity()
export class User extends BaseEntity {

    @Column(
        {
            name: "email",
            unique: true,
            nullable: false,
        }
    )
    email: string

    @Column(
        {
            name: "username",
            unique: true,
            nullable: false,
        }
    )
    username: string

    @Column({ select: false, nullable: false })
    password: string

    @Column({
        select: false,
        nullable: true
    })
    token: string

    @Column({
        nullable: true
    })
    avatar: string

    @Column({
        nullable: true,
        default: Constants.USER_ROLE.USER
    })
    role: number

    @OneToOne(() => PasswordResetOtps, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    passwordResetOtps: PasswordResetOtps

    @OneToMany(() => Sets, set => set.user, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    sets: Sets[]

    @OneToMany(() => UserProgress, progress => progress.user)
    progress: UserProgress[];
}

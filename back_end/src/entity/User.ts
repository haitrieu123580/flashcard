import { Entity, Column, Unique, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { PasswordResetOtps } from "./PasswordResetOtps"
import { Sets } from "./Sets"
import { UserProgress } from "./UserProgress"
import { Constants } from "../core/Constant"
import { TestResult } from "./TestResult"
import { UserAnswer } from "./UserAnswer"
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

    @OneToMany(() => TestResult, testResult => testResult.user, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    testResults: TestResult[]

    @OneToMany(() => UserProgress, progresses => progresses.set, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    progresses: UserProgress[];

    @OneToMany(() => UserAnswer, answers => answers.user, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    answers: UserAnswer[]
}

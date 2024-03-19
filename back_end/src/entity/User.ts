import { Entity, Column, Unique, OneToOne, JoinColumn, Generated } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { PasswordResetOtps } from "./PasswordResetOtps"

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

    @Column()
    password: string

    @Column({
        nullable: true
    })
    token: string

    @Column({
        nullable: true
    })
    avatar: string


    @OneToOne(() => PasswordResetOtps, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    passwordResetOtps: PasswordResetOtps
}

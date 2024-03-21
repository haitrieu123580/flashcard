import { Entity, Column, Unique, OneToOne, JoinColumn, Generated } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { PasswordResetOtps } from "./PasswordResetOtps"

@Entity()
export class Library extends BaseEntity {

    @Column({
        nullable: true
    })
    name: string

    @Column({
        nullable: true
    })
    type: string

    @Column({
        nullable: true
    })
    note: string
}

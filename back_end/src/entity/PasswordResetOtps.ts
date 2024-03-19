import { Entity, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity"


@Entity()
export class PasswordResetOtps extends BaseEntity {

    @Column({
        nullable: true
    })
    otp: string;
}

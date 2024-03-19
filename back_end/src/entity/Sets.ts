import { Entity, Column, Generated } from "typeorm"
import { BaseEntity } from "./BaseEntity"
@Entity()
export class Sets extends BaseEntity {
    @Column({
        nullable: false
    })
    name: string;

}

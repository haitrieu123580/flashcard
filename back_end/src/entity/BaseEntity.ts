import { PrimaryGeneratedColumn, Column, Generated, BeforeInsert, BeforeUpdate } from "typeorm"

export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        nullable: true,
        default: () => "NOW()"
    })
    created_at: Date;

    @Column({
        nullable: true,
    })
    created_by: string;

    @Column({
        nullable: true
    })
    updated_at: Date;

    @Column({
        nullable: true,
    })
    updated_by: string;

    @Column({
        nullable: true,
        // default: "NOW()"
    })
    deleted_at: Date;

    @Column({
        nullable: true
    })
    deleted_by: string;

    // @BeforeInsert()
    // logInsert() {
    //     console.log('Inserting entity:', this);
    // }

    // @BeforeUpdate()
    // logUpdate() {
    //     console.log('Updating entity:', this);
    // }
}
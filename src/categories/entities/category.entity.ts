import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: false
    })
    name: string;
    @BeforeInsert()
    checkName(){
        this.name = this.name.toLocaleLowerCase();
    }
}

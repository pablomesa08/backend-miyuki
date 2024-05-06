import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promotion {
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

    @Column({
        nullable: false,
    })
    value: number;

    @Column({
        nullable: false,
        type: 'boolean',
        default: true
    })
    isAvailable: boolean;
}

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
        this.name = this.name.replace(/\s/g, '');
    }

    @Column({
        nullable: false,
    })
    value: string;

    @Column({
        nullable: false,
        type: 'boolean',
    })
    isAvailable: boolean;
}

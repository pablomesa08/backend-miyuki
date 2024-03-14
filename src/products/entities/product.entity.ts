import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;
    @BeforeInsert()
    checkName(){
        this.name = this.name.toLocaleLowerCase();
    }

    @Column({
        unique: true,
        nullable: false,
    })
    description: string;

    @Column({
        unique: true,
        nullable: false,
        type: 'decimal',
    })
    price: number;

    @Column({
        unique: true,
        nullable: false,
    })
    stock: number;
    
    @Column({
        unique: true,
        nullable: false,
        type: 'decimal',
    })
    mass: number;

    @Column({
        unique: true,
        nullable: false,
        type: 'date',
    })
    date: Date;
}

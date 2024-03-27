import { Cart } from "src/cart/entities/cart.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
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
    description: string;

    @Column({
        nullable: false,
        type: 'decimal',
    })
    price: string;

    @Column({
        nullable: false,
    })
    stock: number;
    
    @Column({
        nullable: false,
        type: 'decimal',
    })
    mass: string;

    @Column({
        nullable: false,
    })
    date: string;

    @ManyToOne(
        () => Cart, 
        (cart) => cart.product,
    )
    cart: Cart;
}

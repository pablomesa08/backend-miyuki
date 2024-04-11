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
        type: 'decimal',
    })
    baseprice: string;

    @Column({
        nullable: false,
    })
    addeddate: string;

    @Column({
        nullable: false,
        type: 'boolean'
    })
    isAvailable: boolean;

    @ManyToOne(
        () => Cart, 
        (cart) => cart.product,
    )
    cart: Cart;
}

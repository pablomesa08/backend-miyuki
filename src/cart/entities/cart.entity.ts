import { User } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        ()=>User,
        (user)=> user.cart,
    )
    user: User;

    @ManyToOne(
        ()=>Product,
        (product)=> product.carts,
    )
    product: Product;

    @Column({
        nullable: false,
    })
    quantity: number;
}

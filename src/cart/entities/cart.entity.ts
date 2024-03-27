import { User } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        ()=>User,
        (user)=> user.cart,
    )
    user: User;

    @OneToMany(
        () => Product, 
        (product) => product.cart,
    )
    product: Product[];

    @Column({
        nullable: false,
    })
    quantity: number;
}

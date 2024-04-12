import { User } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    productId: string;

    @Column()
    formatId: string;

    @Column({
        nullable: false,
    })
    quantity: number;
}

import { User } from "src/auth/entities/auth.entity";
import { Format } from "src/formats/entities/format.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=> User)
    @JoinColumn()
    user: User;

    @OneToOne(()=> Product)
    @JoinColumn()
    product: Product;

    @OneToOne(()=> Format)
    @JoinColumn()
    format: Format;

    @Column({
        nullable: false,
    })
    quantity: number;
}

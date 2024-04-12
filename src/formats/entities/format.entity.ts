import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Format {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
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
    price: string;

    @ManyToMany(() => Product, product => product.formats)
    products: Product[];

}

import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Colorset {
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

    @Column('text',{
        array:true,
        nullable: false,
    })
    colors: string[];

    @ManyToMany(() => Product, product => product.colorsets)
    products: Product[];
}

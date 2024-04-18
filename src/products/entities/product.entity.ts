import { Format } from "src/formats/entities/format.entity";
import { Category } from "src/categories/entities/category.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/auth.entity";
import { Colorset } from "src/colorsets/entities/colorset.entity";

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

    @ManyToMany(() => Category, category => category.products)
    @JoinTable(
        {
            name: 'products_categories',
            joinColumn: {
                name: 'product_id'
            },
            inverseJoinColumn: {
                name: 'category_id'
            }
        }
    )
    categories: Category[];

    @ManyToMany(() => Format, format => format.products)
    @JoinTable(
        {
            name: 'products_formats',
            joinColumn: {
                name: 'product_id'
            },
            inverseJoinColumn: {
                name: 'format_id'
            }
        }
    )
    formats: Format[];

    @ManyToMany(() => User, user => user.products)
    users: User[];

    @ManyToMany(() => Colorset, colorset => colorset.products)
    @JoinTable(
        {
            name: 'products_colorsets',
            joinColumn: {
                name: 'product_id'
            },
            inverseJoinColumn: {
                name: 'colorset_id'
            }
        }
    )
    colorsets: Colorset[];
}

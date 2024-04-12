import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(
        'text', {
            unique: true,
            nullable: false
        }
    )
    email: string;
    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLocaleLowerCase();
    }

    @Column(
        'text', {
            nullable: false
        }
    )
    password: string;

    @Column(
        'text', {
            nullable: false
        }
    )
    name: string;
    @BeforeInsert()
    checkName(){
        this.name = this.name.toLocaleLowerCase();
    }
    
    @Column(
        'text', {
            nullable: true,
        }
    )
    phone: string;

    @Column('bool',{
        default: true
    })
    isActive:boolean;

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[];

    @ManyToMany(() => Product, product => product.users)
    @JoinTable({
        name: 'users_products',
        joinColumn: {
            name: 'user_id'
        },
        inverseJoinColumn: {
            name: 'product_id'
        }
    })
    products: Product[];
}

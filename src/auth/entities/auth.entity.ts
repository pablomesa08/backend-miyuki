import { Cart } from 'src/cart/entities/cart.entity'
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    address: string;
    @BeforeInsert()
    checkAddress(){
        this.address = this.address.toLocaleLowerCase();
    }

    @Column(
        'text', {
            nullable: false
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

    @OneToMany(
        () => Cart, 
        (cart) => cart.user,
    )
    cart: Cart[];
}

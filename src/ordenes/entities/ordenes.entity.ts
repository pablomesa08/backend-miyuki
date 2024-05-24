import { User } from "src/auth/entities/auth.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['promotion'])
export class Ordenes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.ordenes)
    @JoinColumn()
    cliente: User;

    @Column(
        {
            type: 'json'
        }
    )
    orden: any;

    @OneToOne(()=> Promotion)
    @JoinColumn()
    promotion: Promotion;

    @Column(
        {
            nullable: false,
            type: 'boolean',
            default: true
        }
    )
    isActive: boolean;
}

import { User } from 'src/auth/entities/auth.entity';
import { Colorset } from 'src/colorsets/entities/colorset.entity';
import { Format } from 'src/formats/entities/format.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Format)
  @JoinColumn()
  format: Format;

  @Column({
    nullable: false,
  })
  quantity: number;

  // colorset
  @ManyToOne(() => Colorset)
  @JoinColumn()
  colorset: Colorset;
}

import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { FormatsModule } from 'src/formats/formats.module';
import { ColorsetsModule } from 'src/colorsets/colorsets.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    TypeOrmModule.forFeature([Cart]),
    AuthModule,
    ProductsModule,
    FormatsModule,
    ColorsetsModule,
  ],
})
export class CartModule {}

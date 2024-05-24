import { Module, forwardRef } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { Ordenes } from './entities/ordenes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PromotionModule } from 'src/promotion/promotion.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService],
  imports: [TypeOrmModule.forFeature([Ordenes]), AuthModule, PromotionModule, CartModule],
  exports: [TypeOrmModule, OrdenesService]
})
export class OrdenesModule {}

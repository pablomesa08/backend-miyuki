import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Promotion } from './entities/promotion.entity';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService],
  imports: [TypeOrmModule.forFeature([Promotion]), AuthModule],
  exports: [TypeOrmModule, PromotionService]
})
export class PromotionModule {}

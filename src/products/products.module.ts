import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Format } from 'src/formats/entities/format.entity';
import { Colorset } from 'src/colorsets/entities/colorset.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { FormatsModule } from 'src/formats/formats.module';
import { ColorsetsModule } from 'src/colorsets/colorsets.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, CategoriesModule, FormatsModule, ColorsetsModule],
})
export class ProductsModule {}

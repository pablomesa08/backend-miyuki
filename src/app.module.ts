import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { FormatsModule } from './formats/formats.module';
import { ColorsetsModule } from './colorsets/colorsets.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    AuthModule,
    CategoriesModule,
    CartModule,
    FormatsModule,
    ColorsetsModule,
    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
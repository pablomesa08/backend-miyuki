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
import { OrdenesModule } from './ordenes/ordenes.module';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    CategoriesModule,
    CartModule,
    FormatsModule,
    ColorsetsModule,
    PromotionModule,
    OrdenesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isDatabaseUrlDefined = !!process.env.DATABASE_URL;
        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          host: !isDatabaseUrlDefined ? process.env.DB_HOST : undefined,
          port: !isDatabaseUrlDefined ? +process.env.DB_PORT : undefined,
          database: !isDatabaseUrlDefined ? process.env.DB_NAME : undefined,
          username: !isDatabaseUrlDefined ? process.env.DB_USER : undefined,
          password: !isDatabaseUrlDefined ? process.env.DB_PASSWORD : undefined,
          autoLoadEntities: true,
          synchronize: true, // Note: set to false in production
          ssl: isDatabaseUrlDefined ? { rejectUnauthorized: false } : undefined,
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

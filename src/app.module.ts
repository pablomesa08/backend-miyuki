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
    ProductsModule,
    AuthModule,
    CategoriesModule,
    CartModule,
    FormatsModule,
    ColorsetsModule,
    PromotionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isDatabaseUrlAvailable = !!process.env.DATABASE_URL;
        return {
          url: process.env.DATABASE_URL,
          type: 'postgres',
          host: !isDatabaseUrlAvailable ? process.env.DB_HOST : undefined,
          port: !isDatabaseUrlAvailable ? +process.env.DB_PORT : undefined,
          username: !isDatabaseUrlAvailable ? process.env.DB_USER : undefined,
          password: !isDatabaseUrlAvailable
            ? process.env.DB_PASSWORD
            : undefined,
          database: !isDatabaseUrlAvailable ? process.env.DB_NAME : undefined,
          ssl: isDatabaseUrlAvailable
            ? { rejectUnauthorized: false }
            : undefined,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true, // Be cautious with this in production
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

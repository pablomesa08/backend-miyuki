import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isDatabaseUrlAvailable = !!process.env.DATABASE_URL;
        const isSynchronize = process.env.synchronize === 'true'; // for production, set synchronize to false
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
          synchronize: isSynchronize,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

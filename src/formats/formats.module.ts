import { Module } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Format } from './entities/format.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FormatsController],
  providers: [FormatsService],
  imports: [TypeOrmModule.forFeature([Format]), AuthModule],
  exports: [TypeOrmModule, FormatsService]
})
export class FormatsModule {}

import { Module } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Format } from './entities/format.entity';

@Module({
  controllers: [FormatsController],
  providers: [FormatsService],
  imports: [TypeOrmModule.forFeature([Format ])],
})
export class FormatsModule {}

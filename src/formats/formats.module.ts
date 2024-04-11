import { Module } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';

@Module({
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}

import { Module } from '@nestjs/common';
import { ColorsetsService } from './colorsets.service';
import { ColorsetsController } from './colorsets.controller';

@Module({
  controllers: [ColorsetsController],
  providers: [ColorsetsService],
})
export class ColorsetsModule {}

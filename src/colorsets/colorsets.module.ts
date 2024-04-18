import { Module } from '@nestjs/common';
import { ColorsetsService } from './colorsets.service';
import { ColorsetsController } from './colorsets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colorset } from './entities/colorset.entity';

@Module({
  controllers: [ColorsetsController],
  providers: [ColorsetsService],
  imports: [TypeOrmModule.forFeature([Colorset])],
})
export class ColorsetsModule {}

import { Module } from '@nestjs/common';
import { ColorsetsService } from './colorsets.service';
import { ColorsetsController } from './colorsets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colorset } from './entities/colorset.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ColorsetsController],
  providers: [ColorsetsService],
  imports: [TypeOrmModule.forFeature([Colorset]), AuthModule],
  exports: [TypeOrmModule, ColorsetsService]
})
export class ColorsetsModule {}

import { Injectable } from '@nestjs/common';
import { CreateColorsetDto } from './dto/create-colorset.dto';
import { UpdateColorsetDto } from './dto/update-colorset.dto';

@Injectable()
export class ColorsetsService {
  create(createColorsetDto: CreateColorsetDto) {
    return 'This action adds a new colorset';
  }

  findAll() {
    return `This action returns all colorsets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colorset`;
  }

  update(id: number, updateColorsetDto: UpdateColorsetDto) {
    return `This action updates a #${id} colorset`;
  }

  remove(id: number) {
    return `This action removes a #${id} colorset`;
  }
}

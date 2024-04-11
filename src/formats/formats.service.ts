import { Injectable } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';

@Injectable()
export class FormatsService {
  create(createFormatDto: CreateFormatDto) {
    return 'This action adds a new format';
  }

  findAll() {
    return `This action returns all formats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} format`;
  }

  update(id: number, updateFormatDto: UpdateFormatDto) {
    return `This action updates a #${id} format`;
  }

  remove(id: number) {
    return `This action removes a #${id} format`;
  }
}

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { Format } from './entities/format.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormatsService {
  constructor(
    @InjectRepository(Format)
    private formatRepository: Repository<Format>
  ){}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Format exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Format - Please check server logs`);
  }

  async create(createFormatDto: CreateFormatDto) {
    try {

      const format= this.formatRepository.create(createFormatDto);
      await this.formatRepository.save(format);
      return format;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const formats = await this.formatRepository.find({});
    
    if(!formats){
      throw new NotFoundException(`No items found`);
    }

    return formats;
  }

  async findOne(id: string) {
    const format = await this.formatRepository.findOneBy({id:id});
    
    if(!format){
      throw new NotFoundException(`Format with id ${id} not found`);
    }

    return format;
  }

  async update(id: string, updateFormatDto: UpdateFormatDto) {
    const format = await this.formatRepository.preload({id:id,
      ...updateFormatDto});

    if(!format){
      throw new NotFoundException(`Format with id ${id} not found`);
    }

    await this.formatRepository.save(format);
    return format;
  }

  async remove(id: string) {
    const format = await this.formatRepository.findOneBy({id:id});
    
    if(!format){
      throw new NotFoundException(`Format with id ${id} not found`);
    }
    await this.formatRepository.remove(format);
  }
}

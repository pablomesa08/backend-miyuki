import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateColorsetDto } from './dto/create-colorset.dto';
import { UpdateColorsetDto } from './dto/update-colorset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colorset } from './entities/colorset.entity';

@Injectable()
export class ColorsetsService {
  constructor(
    @InjectRepository(Colorset)
    private colorsetRepository: Repository<Colorset>,
  ){}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`ColorSet exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create ColorSet- Please check server logs`);
  }

  async create(createColorsetDto: CreateColorsetDto) {
    try {

      const colorset= this.colorsetRepository.create(createColorsetDto);
      await this.colorsetRepository.save(colorset);
      return colorset;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const colorsets = await this.colorsetRepository.find({});
    
    if(!colorsets){
      throw new NotFoundException(`No items found`);
    }

    return colorsets;
  }

  async findOne(id: string) {
    const colorset = await this.colorsetRepository.findOneBy({id:id});
    
    if(!colorset){
      throw new NotFoundException(`ColorSet with id ${id} not found`);
    }

    return colorset;
  }

  async update(id: string, updateColorsetDto: UpdateColorsetDto) {
    const colorset = await this.colorsetRepository.preload({id:id,
      ...updateColorsetDto});

    if(!colorset){
      throw new NotFoundException(`ColorSet with id ${id} not found`);
    }

    await this.colorsetRepository.save(colorset);
    return colorset;
  }

  async remove(id: string) {
    const colorset = await this.colorsetRepository.findOneBy({id:id});
    
    if(!colorset){
      throw new NotFoundException(`ColorSet with id ${id} not found`);
    }
    await this.colorsetRepository.remove(colorset);
  }
}

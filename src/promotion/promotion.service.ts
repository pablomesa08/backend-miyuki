import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>
  ) {}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Promotion exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Promotion- Please check server logs`);
  }
  
  async create(createPromotionDto: CreatePromotionDto) {
    try {

      const promotion= this.promotionRepository.create(createPromotionDto);
      await this.promotionRepository.save(promotion);
      return promotion;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const promotions = await this.promotionRepository.find({});
    
    if(!promotions){
      throw new NotFoundException(`No items found`);
    }

    return promotions;
  }

  async findOne(id: string) {
    const promotion = await this.promotionRepository.findOneBy({id:id});
    
    if(!promotion){
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }

    return promotion;
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.preload({id:id,
      ...updatePromotionDto});

    if(!promotion){
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }

    await this.promotionRepository.save(promotion);
    return promotion;
  }

  async remove(id: string) {
    const promotion = await this.promotionRepository.findOneBy({id:id});
    
    if(!promotion){
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    await this.promotionRepository.remove(promotion);
  }
}

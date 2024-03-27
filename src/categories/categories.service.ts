import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Category exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Category - Please check server logs`);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {

      const category= this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find({});
    
    if(!categories){
      throw new NotFoundException(`No items found`);
    }

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({id:id});
    
    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({id:id,
      ...updateCategoryDto});

    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.save(category);
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({id:id});
    
    if(!category){
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }
}

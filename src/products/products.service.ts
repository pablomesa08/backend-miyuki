import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Product exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Product - Please check server logs`);
  }

  async create(createProductDto: CreateProductDto) {
    try {

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const products = await this.productRepository.find({});
    
    if(!products){
      throw new NotFoundException(`No items found`);
    }

    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id:id});
    
    if(!product){
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({id:id,
      ...updateProductDto});

    if(!product){
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.save(product);
    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({id:id});
    
    if(!product){
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.remove(product);
    
  }
}

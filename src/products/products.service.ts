import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Format } from 'src/formats/entities/format.entity';
import { Colorset } from 'src/colorsets/entities/colorset.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    
    @InjectRepository(Format)
    private formatRepository: Repository<Format>,

    @InjectRepository(Colorset)
    private colorsetRepository: Repository<Colorset>
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
      //Validacion de categorias
      const categories = await Promise.all(
        createProductDto.categoriesIds.map((id)=> this.categoryRepository.findOne(
          {where: {id: id}}
        ).then((category)=>{
            if(!category){
              throw new BadRequestException(`Category with id ${id} not found`);
            }
            return category;
          }
          )
        )
      );

      //Validacion de formatos
      const formats = await Promise.all(
        createProductDto.formatsIds.map((id)=> this.formatRepository.findOne(
          {where: {id: id}}
        ).then((format)=>{
            if(!format){
              throw new BadRequestException(`Format with id ${id} not found`);
            }
            return format;
          }
          )
        )
      );
      
      //Validacion de colorsets
      const colorsets = await Promise.all(
        createProductDto.colorsetsIds.map((id)=> this.colorsetRepository.findOne(
          {where: {id: id}}
        ).then((colorset)=>{
            if(!colorset){
              throw new BadRequestException(`Colorset with id ${id} not found`);
            }
            return colorset;
          }
          )
        )
      );

      //Creacion de producto
      const product = this.productRepository.create(
        {...createProductDto, categories: categories, formats: formats, colorsets: colorsets}
      );
      //Guardado de producto
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const products = await this.productRepository.find({relations: ['categories', 'formats', 'colorsets']});
    
    if(!products){
      throw new NotFoundException(`No items found`);
    }

    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: {id: id},
      relations: ['categories', 'formats', 'colorsets']
    });
    
    if(!product){
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

    async update(id: string, updateProductDto: UpdateProductDto) {
      const { categoriesIds, formatsIds, colorsetsIds, ...updateData } = updateProductDto;

      // Preload the product with update data
      const product = await this.productRepository.preload({ id, ...updateData });

      if (!product) {
          throw new NotFoundException(`Product with id ${id} not found`);
      }

      // Resolve categories
      if (categoriesIds) {
          product.categories = await this.categoryRepository.find({
              where: categoriesIds.map(id => ({ id })),
          });
      }

      // Resolve formats
      if (formatsIds) {
          product.formats = await this.formatRepository.find({
              where: formatsIds.map(id => ({ id })),
          });
      }

      // Resolve colorsets
      if (colorsetsIds) {
          product.colorsets = await this.colorsetRepository.find({
              where: colorsetsIds.map(id => ({ id })),
          });
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

  //Metodo para hallar productos por categorias usando QueryBuilder
  async findByCategories(categoryIds: string[]){
    const products = await this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.categories', 'category')
    .where('category.id IN (:...categoryIds)', {categoryIds})
    .getMany();

    if(!products || products.length === 0){
      throw new NotFoundException(`No items found`);
    }

    return products;
  }

  //Método para hallar productos por formatos usando QueryBuilder
  async findByFormats(formatIds: string[]){
    const products = await this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.formats', 'format')
    .where('format.id IN (:...formatIds)', {formatIds})
    .getMany();

    if(!products || products.length === 0){
      throw new NotFoundException(`No items found`);
    }

    return products;
  }

  //Método para hallar productos por colorsets usando QueryBuilder
  async findByColorsets(colorsetIds: string[]){
    const products = await this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.colorsets', 'colorset')
    .where('colorset.id IN (:...colorsetIds)', {colorsetIds})
    .getMany();

    if(!products || products.length === 0){
      throw new NotFoundException(`No items found`);
    }

    return products;
  }
}

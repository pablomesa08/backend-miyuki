import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { Format } from 'src/formats/entities/format.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Format)
    private formatRepository: Repository<Format>
  ){}

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Cart exists in DB ${JSON.stringify(error.keyvalue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Cart - Please check server logs`);
  }

  async create(createCartDto: CreateCartDto) {
    try {
      //Verificar si el id del usuario existe
      const user = await this.userRepository.findOne({where: {id: createCartDto.userId}});
      if(!user){
        throw new NotFoundException(`User with id ${createCartDto.userId} not found`);
      }

      //Verificar si el id del producto existe
      const product = await this.productRepository.findOne({where: {id: createCartDto.productId}});
      if(!product){
        throw new NotFoundException(`Product with id ${createCartDto.productId} not found`);
      }

      //Verificar si el id del formato existe
      const format = await this.formatRepository.findOne({where: {id: createCartDto.formatId}});
      if(!format){
        throw new NotFoundException(`Format with id ${createCartDto.formatId} not found`);
      }

      //Crear el carrito teniendo en cuenta las validaciones anteriores
      const cart = this.cartRepository.create(createCartDto);
      cart.user = user;
      cart.product = product;
      cart.format = format;
      await this.cartRepository.save(cart);
      return cart;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const carts = await this.cartRepository.find({relations: ['user', 'product', 'format']});
    
    if(!carts){
      throw new NotFoundException(`No items found`);
    }

    return carts;
  }

  async findOne(id: string) {
    const cart= await this.cartRepository.findOne({
      where: {id:id},
      relations: ['user', 'product', 'format']
      },
    );
    
    if(!cart){
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.preload({id:id, ...updateCartDto});

    if(!cart){
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    await this.cartRepository.save(cart);
    return cart;
  }

  async remove(id: string) {
    const cart = await this.cartRepository.findOneBy({id:id});
    
    if(!cart){
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    await this.cartRepository.remove(cart);
  }
}

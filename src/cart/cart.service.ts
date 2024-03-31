import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>
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

      const cart= this.cartRepository.create(createCartDto);
      await this.cartRepository.save(cart);
      return cart;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const carts = await this.cartRepository.find({});
    
    if(!carts){
      throw new NotFoundException(`No items found`);
    }

    return carts;
  }

  async findOne(id: string) {
    const cart= await this.cartRepository.findOneBy({id:id});
    
    if(!cart){
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.preload({id:id,
      ...updateCartDto});

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

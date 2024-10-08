import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdenesDto } from './dto/create-ordenes.dto';
import { Ordenes } from './entities/ordenes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Promotion } from 'src/promotion/entities/promotion.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Ordenes)
    private orderRepository: Repository<Ordenes>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,

    private readonly cartService: CartService,
  ) {}

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Order exists in DB ${JSON.stringify(error.keyvalue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Order- Please check server logs`,
    );
  }

  //Metodo para crear una orden
  async create(createOrdenesDto: CreateOrdenesDto, user: User) {
    try {
      const order = await this.cartService.obtainCart(user);
      const orderEntity = await this.orderRepository.create({
        cliente: user,
        orden: order,
      });
  
      await this.orderRepository.manager.transaction(async transactionalEntityManager => {
        if (createOrdenesDto.promotion) {
          const promotion = await transactionalEntityManager.findOne(Promotion, {
            where: { id: createOrdenesDto.promotion },
          });
          if (!promotion) {
            throw new NotFoundException(
              `Promotion with id ${createOrdenesDto.promotion} not found`,
            );
          }
          if (promotion.isAvailable === false) {
            throw new BadRequestException(
              `Promotion with id ${createOrdenesDto.promotion} is not available`,
            );
          }
          console.log('Promotion: ', promotion);
          orderEntity.promotion = promotion;
          promotion.isAvailable = false;
          await transactionalEntityManager.save(promotion);
          orderEntity.promotion = promotion;
          await transactionalEntityManager.save(orderEntity);
        } else {
          //Save order
          await transactionalEntityManager.save(orderEntity);
        }
  
        //Clear cart
        await this.cartService.clearCart(user);
      });
  
      return orderEntity;
    } catch (e) {
      this.handleExceptions(e);
    }
  }
  //Metodo para obtener todas las ordenes de la base de datos
  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['cliente', 'promotion'],
    });
    if (!orders) {
      throw new NotFoundException(`No items found`);
    }
    return orders;
  }

  //Obtener todas las ordenes de un usuario
  async findAllUserOrders(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['ordenes'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user.ordenes;
  }

  //Metodo para eliminar una orden
  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    await this.orderRepository.remove(order);
  }
}

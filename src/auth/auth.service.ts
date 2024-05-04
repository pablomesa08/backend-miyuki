import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/Jwt.payload';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Product } from 'src/products/entities/product.entity';
import { FavoritesAuthDto } from './dto/favorites-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly jwtService: JwtService,
  ) {}

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in DB ${JSON.stringify(error.keyvalue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create User - Please check server logs`,
    );
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      //Creacion del usuario
      const user = this.userRepository.create({
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 10),
      });

      //Guardado del usuario
      await this.userRepository.save(user);
      const { email, name, phone } = user;
      return { email, name, phone };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.detail);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUser: LoginAuthDto) {
    try {
      const { email, password } = loginUser;
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new UnauthorizedException(`User or password incorrect`);
      }

      const isValid = bcrypt.compareSync(password, user.password);
      const { name } = user;

      if (!isValid) {
        throw new UnauthorizedException(`User or password incorrect`);
      }
      const jwt = this.getJwtToken({ email, name });
      return { email, jwt };
    } catch (error) {
      throw new UnauthorizedException(`User or password incorrect`);
    }
  }

  async findAll() {
    const auths = await this.userRepository.find({ relations: ['products'] });

    if (!auths) {
      throw new NotFoundException(`No auths found`);
    }

    return auths;
  }

  async findOne(id: string) {
    const auth = await this.userRepository.findOne({
      where: { id: id },
      relations: ['products'],
    });

    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    return auth;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const auth = await this.userRepository.preload({
      id: id,
      ...updateAuthDto,
    });

    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }

    await this.userRepository.save(auth);

    return auth;
  }

  async remove(id: string) {
    const auth = await this.userRepository.findOneBy({ id: id });

    if (!auth) {
      throw new NotFoundException(`Auth with id ${id} not found`);
    }

    await this.userRepository.remove(auth);
  }

  async addFavorites(id: string, user: User) {
    console.log('User', user);

    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      // Verificar si ya existe una relación entre el producto y el usuario
      const existingRelation = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.products', 'product')
        .where('user.id = :userId', { userId: user.id })
        .andWhere('product.id = :productId', { productId: id })
        .getOne();

      if (existingRelation) {
        throw new BadRequestException(
          `Product with id ${id} is already a favorite`,
        );
      }

      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'products')
        .of(user.id)
        .add(product);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getFavorites(user: User) {
    try {
      console.log('User', user);

      const favorites = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.products', 'product') // Asegúrate de que 'products' es el nombre correcto en la entidad User.
        .where('user.id = :userId', { userId: user.id })
        .getOne();

      if (
        !favorites ||
        !favorites.products ||
        favorites.products.length === 0
      ) {
        return [];
      }

      return favorites.products;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async removeFavorites(id: string, user: User) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      // Verificar si ya existe una relación entre el producto y el usuario
      const existingRelation = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.products', 'product')
        .where('user.id = :userId', { userId: user.id })
        .andWhere('product.id = :productId', { productId: id })
        .getOne();

      if (!existingRelation) {
        throw new BadRequestException(
          `Product with id ${id} is not a favorite`,
        );
      }

      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'products')
        .of(user.id)
        .remove(product);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}

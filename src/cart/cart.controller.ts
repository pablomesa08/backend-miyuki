import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/auth/entities/auth.entity';
import { getUser } from 'src/auth/decorators/getuser.decorator';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({
    summary: 'Inserta un producto al carrito de compra del usuario',
  })
  @UseGuards(AuthGuard())
  create(@getUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto, user);
  }

  @Get('userCart')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({
    summary:
      'Obtener todos los productos del carrito de compra del usuario. Requiere estar autenticado',
  })
  @UseGuards(AuthGuard())
  findUserCart(@getUser() user: User) {
    return this.cartService.findUserProductCart(user);
  }


  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({
    summary:
      'Eliminar uno de los productos añadidos al carrito. Requiere estar autenticado',
  })
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}

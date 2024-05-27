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
import { OrdenesService } from './ordenes.service';
import { CreateOrdenesDto } from './dto/create-ordenes.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/decorators/getuser.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';

@Controller('orders')
@ApiTags('Orders')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @ApiProperty({ description: 'Create a new order' })
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard())
  create(@Body() createOrdenesDto: CreateOrdenesDto, @getUser() user: User) {
    return this.ordenesService.create(createOrdenesDto, user);
  }

  @Get()
  @ApiProperty({ description: 'Get all orders' })
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiProperty({
    description:
      'Obtener todas las ordenes de un usuario. Debe ser un usuario autenticado y ser el "user"',
  })
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.ordenesService.findAllUserOrders(id);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiProperty({
    description:
      'Eliminar una orden. Debe ser un usuario autenticado y ser el "user"',
  })
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  //@ApiBearerAuth('User JWT Authentication')
  //@UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  //@ApiBearerAuth('User JWT Authentication')
  //@UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

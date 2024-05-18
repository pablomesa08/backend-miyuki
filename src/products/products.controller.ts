import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Crear un nuevo producto. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos existentes.' })
  findAll() {
    return this.productsService.findAll();
  }

  //Endpoint para obtener productos por categorias
  @Get('categories')
  @ApiOperation({ summary: 'Filtrar productos por medio de ids de categorias separados por comas' })
  async findByCategories(@Query('categoryIds') categoryIds: string | string[]): Promise<any> {
    if (typeof categoryIds === 'string') {
      categoryIds = categoryIds.split(',');
    }
    return this.productsService.findByCategories(categoryIds);
  }

  //Endpoint para obtener productos por formatos
  @Get('formats')
  @ApiOperation({ summary: 'Filtrar productos por medio de ids de formatos separados por comas' })
  async findByFormats(@Query('formatIds') formatIds: string | string[]): Promise<any> {
    if (typeof formatIds === 'string') {
      formatIds = formatIds.split(',');
    }
    return this.productsService.findByFormats(formatIds);
  }

  //Endpoint para obtener productos por colorsets
  @Get('colorsets')
  @ApiOperation({ summary: 'Filtrar productos por medio de ids de colorsets separados por comas' })
  async findByColorsets(@Query('colorsetIds') colorsetIds: string | string[]): Promise<any> {
    if (typeof colorsetIds === 'string') {
      colorsetIds = colorsetIds.split(',');
    }
    return this.productsService.findByColorsets(colorsetIds);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su id específico.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Editar informacion de un producto. Requiere ser admin y estar autenticado'})
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Eliminar un producto. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

}

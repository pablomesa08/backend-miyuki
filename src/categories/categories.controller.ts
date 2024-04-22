import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  //@ApiBearerAuth('User JWT Authentication')
  //@UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

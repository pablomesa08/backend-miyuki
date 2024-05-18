import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorsetsService } from './colorsets.service';
import { CreateColorsetDto } from './dto/create-colorset.dto';
import { UpdateColorsetDto } from './dto/update-colorset.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Colorsets')
@Controller('colorsets')
export class ColorsetsController {
  constructor(private readonly colorsetsService: ColorsetsService) {}

  @Post()
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Crear un nuevo colorset. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createColorsetDto: CreateColorsetDto) {
    return this.colorsetsService.create(createColorsetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los colorsets existentes.' })
  findAll() {
    return this.colorsetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un colorset por su id específico.' })
  findOne(@Param('id') id: string) {
    return this.colorsetsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Editar informacion de un colorset. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateColorsetDto: UpdateColorsetDto) {
    return this.colorsetsService.update(id, updateColorsetDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Eliminar un colorset. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.colorsetsService.remove(id);
  }
}

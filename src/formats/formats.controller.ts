import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Formats')
@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Post()
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Crear un nuevo formato. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createFormatDto: CreateFormatDto) {
    return this.formatsService.create(createFormatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los formatos existentes.' })
  findAll() {
    return this.formatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un colorset por su id específico.' })
  findOne(@Param('id') id: string) {
    return this.formatsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Editar informacion de un formato. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateFormatDto: UpdateFormatDto) {
    return this.formatsService.update(id, updateFormatDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Eliminar un formato. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.formatsService.remove(id);
  }
}

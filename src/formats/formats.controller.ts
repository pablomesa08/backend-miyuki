import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/user-role-guard.guard';

@Controller('formats')
export class FormatsController {
  constructor(private readonly formatsService: FormatsService) {}

  @Post()
  //@UseGuards(AuthGuard() ,UseRoleGuardGuard)
  create(@Body() createFormatDto: CreateFormatDto) {
    return this.formatsService.create(createFormatDto);
  }

  @Get()
  findAll() {
    return this.formatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateFormatDto: UpdateFormatDto) {
    return this.formatsService.update(id, updateFormatDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard() ,UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.formatsService.remove(id);
  }
}

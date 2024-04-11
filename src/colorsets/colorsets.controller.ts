import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorsetsService } from './colorsets.service';
import { CreateColorsetDto } from './dto/create-colorset.dto';
import { UpdateColorsetDto } from './dto/update-colorset.dto';

@Controller('colorsets')
export class ColorsetsController {
  constructor(private readonly colorsetsService: ColorsetsService) {}

  @Post()
  create(@Body() createColorsetDto: CreateColorsetDto) {
    return this.colorsetsService.create(createColorsetDto);
  }

  @Get()
  findAll() {
    return this.colorsetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorsetDto: UpdateColorsetDto) {
    return this.colorsetsService.update(+id, updateColorsetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsetsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from './guards/user-role-guard.guard';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @UseGuards()
  loginUser(@Body() loginAuthDto:LoginAuthDto){
    return this.authService.login(loginAuthDto);
  }

  @Get()
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}

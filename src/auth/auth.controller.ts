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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from './guards/user-role-guard.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { getUser } from './decorators/getuser.decorator';
import { User } from './entities/auth.entity';

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
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  //@ApiBearerAuth('User JWT Authentication')
  //@UseGuards(AuthGuard(), UseRoleGuardGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  //@ApiBearerAuth('User JWT Authentication')
  //@UseGuards(AuthGuard(), UseRoleGuardGuard)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @Post('favorites/:id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard())
  favorites(@getUser() user: User, @Param('id') id: string) {
    return this.authService.addFavorites(id, user);
  }

  // No funciona
  @Get('favorites')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard())
  getFavorites(@getUser() user: User) {
    return this.authService.getFavorites(user);
  }

  @Delete('favorites/:id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard())
  removeFavorites(@getUser() user: User, @Param('id') id: string) {
    return this.authService.removeFavorites(id, user);
  }
}

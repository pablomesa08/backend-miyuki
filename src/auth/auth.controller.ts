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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { getUser } from './decorators/getuser.decorator';
import { User } from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar registro dentro de la página' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realizar login dentro de la página, se genera JWT token' })
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }


  @Get()
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Obtener todos los usuarios que se hayan registrado. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Obtener usuario por id específico. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Editar informacion de un registro. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Eliminar un usuario. Requiere ser admin y estar autenticado' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @Post('favorites/:id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Agregar un nuevo producto favorito al usuario. Debe estar autenticado, Id es el del producto' })
  @UseGuards(AuthGuard())
  favorites(@getUser() user: User, @Param('id') id: string) {
    return this.authService.addFavorites(id, user);
  }

  @Post('favorites')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Obtener los productos favoritos del usuario. Debe estar autenticado' })
  @UseGuards(AuthGuard())
  getFavorites(@getUser() user: User) {
    return this.authService.getFavorites(user);
  }

  @Delete('favorites/:id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Eliminar un producto de los favoritos del usuario por su Id. Debe estar autenticado' })
  @UseGuards(AuthGuard())
  removeFavorites(@getUser() user: User, @Param('id') id: string) {
    return this.authService.removeFavorites(id, user);
  }
}

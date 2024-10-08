import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Category } from 'src/categories/entities/category.entity';
import { ProductsModule } from 'src/products/products.module';
import { OrdenesModule } from 'src/ordenes/ordenes.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[forwardRef(() => ProductsModule),TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({//Porque se tiene que esperar que se cargue todo en la app
    imports:[],
    inject:[],
    useFactory:()=>{
      console.log(process.env.SECRET_PASSWORD);
      return {
        secret:process.env.SECRET_PASSWORD,
        signOptions:{
          expiresIn:'168h'
        }
      }
    }
  }),
  ],
  exports:[TypeOrmModule,JwtStrategy,PassportModule,JwtModule, AuthService],
})
export class AuthModule {}
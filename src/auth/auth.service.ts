import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/Jwt.payload';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const user= this.userRepository.create({
        ...createAuthDto, password: bcrypt.hashSync(createAuthDto.password,10)
      });
      await this.userRepository.save(user);
      const {email, address, phone} = user;
      return {email, address,phone};
    } catch (e) {
      console.log(e)
      throw new BadRequestException(e.detail);
    }
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUser: LoginAuthDto){
    try {
      const {email, password} = loginUser;
      const user = await this.userRepository.findOneBy({email});
      
      if(!user){
        throw new UnauthorizedException(`User or password incorrect`);
      }

      const isValid=bcrypt.compareSync(password, user.password);
      
      if(!isValid){
        throw new UnauthorizedException(`User or password incorrect`);
      }
      const jwt = this.getJwtToken({email});
      return {email,jwt}
    } catch (error) {
      throw new UnauthorizedException(`User or password incorrect`);
    }
  }

  async findAll() {
    const auths = await this.userRepository.find({});

    if (!auths){
      throw new NotFoundException(`No auths found`);
    }

    return auths;
  }

  async findOne(id: string) {
    const auth = await this.userRepository.findOneBy({id:id});

    if(!auth){
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    return auth;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const auth = await this.userRepository.preload({id:id, ...updateAuthDto});

    if(!auth){
      throw new NotFoundException(`Auth with id ${id} not found`);
    }
    
    await this.userRepository.save(auth);

    return auth;
  }

  async remove(id: string) {
    const auth = await this.userRepository.findOneBy({id:id});

    if(!auth){
      throw new NotFoundException(`Auth with id ${id} not found`);
    }

    await this.userRepository.remove(auth);
  }

}

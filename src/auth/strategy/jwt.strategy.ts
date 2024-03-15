import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces/Jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){
        super({
            secretOrKey:process.env.SECRET_PASSWORD,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {email}=payload;

        const user=await this.userRepository.findOneBy({email});
        if(!user){
            throw new UnauthorizedException(`Not authorized`);
        }
        if(!user.isActive){
            throw new UnauthorizedException(`Not authorized`)
        }
        
        return user;
    }
}
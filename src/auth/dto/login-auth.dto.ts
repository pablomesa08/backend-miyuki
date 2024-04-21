import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsArray } from "class-validator";

export class LoginAuthDto{
    @ApiProperty({description:'The email of the user'})
    @IsString()
    @IsEmail()
    @MinLength(4)
    @MaxLength(70)
    readonly email: string;

    @ApiProperty({description:'The password of the user'})
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?!.[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
            message:'The password must have a Uppercase, lowercase letter and a number'
        }
    )
    readonly password: string;

    @IsArray()
    @IsString({each:true})
    readonly productsIds: string[];
}
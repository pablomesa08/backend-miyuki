import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, MaxLength, IsString, Matches, IsPositive, IsOptional } from "class-validator";


export class UpdateAuthDto {
    @ApiProperty({description:'The email of the user'})
    @IsString()
    @IsEmail()
    @MinLength(4)
    @MaxLength(70)
    @IsOptional()
    readonly email: string;

    @ApiProperty({description:'The password of the user'})
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsOptional()
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?!.[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
            message:'The password must have a Uppercase, lowercase letter and a number'
        }
    )
    readonly password: string;

    @ApiProperty({description:'The full name of the user'})
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @IsOptional()
    readonly name: string;

    @ApiProperty({description:'The phone number of the user'})
    @IsString()
    @IsPositive()
    @MinLength(7)
    @MaxLength(20)
    @IsOptional()
    readonly phone: string;
}

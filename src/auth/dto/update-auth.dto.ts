import { IsEmail, MinLength, MaxLength, IsString, Matches, IsPositive, IsOptional } from "class-validator";


export class UpdateAuthDto {
    @IsString()
    @IsEmail()
    @MinLength(4)
    @MaxLength(70)
    @IsOptional()
    readonly email: string;

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

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @IsOptional()
    readonly name: string;

    @IsString()
    @IsPositive()
    @MinLength(7)
    @MaxLength(20)
    @IsOptional()
    readonly phone: string;
}

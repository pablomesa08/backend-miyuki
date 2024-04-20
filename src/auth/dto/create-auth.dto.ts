import { IsArray, IsEmail, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsEmail()
    @MinLength(4)
    @MaxLength(70)
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?!.[.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
            message:'The password must have a Uppercase, lowercase letter and a number'
        }
    )
    readonly password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    readonly name: string;

    @IsString()
    @IsPhoneNumber()
    @MinLength(7)
    @MaxLength(20)
    readonly phone: string;
}

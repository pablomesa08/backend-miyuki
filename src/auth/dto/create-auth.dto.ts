import { ApiHeader, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";

@ApiHeader({
    name: 'Authorization',
})
export class CreateAuthDto {
    
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

    @ApiProperty({description:'The full name of the user'})
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    readonly name: string;

    @ApiProperty({description:'The phone number of the user'})
    @IsString()
    @IsPhoneNumber()
    @MinLength(7)
    @MaxLength(20)
    readonly phone: string;
}

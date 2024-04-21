import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsString, MaxLength, MinLength } from "class-validator";

export class CreateFormatDto {
    @ApiProperty({description:'The name of the format'})
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    readonly name: string;

    @ApiProperty({description:'The price of the format'})
    @IsString()
    @IsDecimal()
    readonly price: string;
}

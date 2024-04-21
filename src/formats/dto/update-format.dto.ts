import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateFormatDto {
    @ApiProperty({description:'The name of the format'})
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    @IsOptional()
    readonly name: string;

    @ApiProperty({description:'The price of the format'})
    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly price: string;
}

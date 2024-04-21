import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsBoolean, IsBooleanString, IsDateString, IsDecimal, IsNumber, IsPositive, IsString, MaxLength, MinDate, MinLength } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class CreateProductDto {
    @ApiProperty({description:'The name of the product'})
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    readonly name: string;

    @ApiProperty({description:'The base price of the product'})
    @IsString()
    @IsDecimal()
    readonly baseprice: string;

    @ApiProperty({description:'The date when the product was added'})
    @IsString()
    @IsDateString()
    readonly addeddate: string;

    @ApiProperty({description:'The availability of the product'})
    @IsBoolean()
    readonly isAvailable: boolean;

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    readonly categoriesIds: string[];

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    readonly formatsIds: string[];

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    readonly colorsetsIds: string[];
}

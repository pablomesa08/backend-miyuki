import { ArrayMinSize, IsArray, IsBoolean, IsBooleanString, IsDateString, IsDecimal, IsNumber, IsPositive, IsString, MaxLength, MinDate, MinLength } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    readonly name: string;

    @IsString()
    @IsDecimal()
    readonly baseprice: string;

    @IsString()
    @IsDateString()
    readonly addeddate: string;

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

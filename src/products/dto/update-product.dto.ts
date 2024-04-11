import { IsString, MinLength, MaxLength, IsNumber, IsDecimal, IsPositive, IsDate, MinDate, IsOptional, IsDateString, IsBoolean } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class UpdateProductDto {
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    @IsOptional()
    readonly name: string;

    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly baseprice: string;

    @IsString()
    @IsDateString()
    @IsOptional()
    readonly addeddate: string;

    @IsBoolean()
    @IsOptional()
    readonly isAvailable: boolean;

    readonly carts: Cart[];
}

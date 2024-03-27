import { IsString, MinLength, MaxLength, IsNumber, IsDecimal, IsPositive, IsDate, MinDate, IsOptional, IsDateString } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class UpdateProductDto {
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    @IsOptional()
    readonly name: string;

    @IsString()
    @MinLength(10)
    @MaxLength(450)
    @IsOptional()
    readonly description: string;

    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly price: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    readonly stock: number;

    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly mass: string;

    @IsString()
    @IsDateString()
    @IsOptional()
    readonly date: string;

    readonly carts: Cart[];
}

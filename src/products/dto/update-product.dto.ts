import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsNumber, IsDecimal, IsPositive, IsDate, MinDate, IsOptional, IsDateString, IsBoolean } from "class-validator";
import { Cart } from "src/cart/entities/cart.entity";

export class UpdateProductDto {
    @ApiProperty({description:'The name of the product'})
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    @IsOptional()
    readonly name: string;

    @ApiProperty({description:'The base price of the product'})
    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly baseprice: string;

    @ApiProperty({description:'The date when the product was added'})
    @IsString()
    @IsDateString()
    @IsOptional()
    readonly addeddate: string;

    @ApiProperty({description:'The availability of the product'})
    @IsBoolean()
    @IsOptional()
    readonly isAvailable: boolean;

    readonly carts: Cart[];
}

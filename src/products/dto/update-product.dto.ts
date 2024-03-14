import { IsString, MinLength, MaxLength, IsNumber, IsDecimal, IsPositive, IsDate, MinDate, IsOptional } from "class-validator";

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

    @IsNumber()
    @IsDecimal()
    @IsPositive()
    @IsOptional()
    readonly price: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    readonly stock: number;

    @IsNumber()
    @IsDecimal()
    @IsPositive()
    @IsOptional()
    readonly mass: number;

    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    readonly date: Date;
}

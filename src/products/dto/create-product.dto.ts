import { IsDate, IsDecimal, IsNumber, IsPositive, IsString, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    @MaxLength(150)
    readonly name: string;

    @IsString()
    @MinLength(10)
    @MaxLength(450)
    readonly description: string;

    @IsNumber()
    @IsDecimal()
    @IsPositive()
    readonly price: number;

    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @IsNumber()
    @IsDecimal()
    @IsPositive()
    readonly mass: number;

    @IsDate()
    @MinDate(new Date())
    readonly date: Date;
}

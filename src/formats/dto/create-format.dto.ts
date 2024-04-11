import { IsDecimal, IsString, MaxLength, MinLength } from "class-validator";

export class CreateFormatDto {
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    readonly name: string;

    @IsString()
    @IsDecimal()
    readonly price: string;
}

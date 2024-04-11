import { IsDecimal, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateFormatDto {
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    @IsOptional()
    readonly name: string;

    @IsString()
    @IsDecimal()
    @IsOptional()
    readonly price: string;
}

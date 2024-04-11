import { IsString, MinLength, MaxLength, IsArray, ArrayMinSize, ArrayMaxSize, IsOptional } from "class-validator";

export class UpdateColorsetDto {
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    @IsOptional()
    readonly name: string;

    @IsString({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(15)
    @IsOptional()
    readonly colors: string[];
}

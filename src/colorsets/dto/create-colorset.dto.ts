import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateColorsetDto {
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    readonly name: string;

    @IsString({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(15)
    readonly colors: string[];
}
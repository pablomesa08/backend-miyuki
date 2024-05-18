import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateColorsetDto {
    @ApiProperty({description:'The name of the colorset'})
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    readonly name: string;

    @ApiProperty({description:'The list of colors of the colorset'})
    @IsString({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    readonly colors: string[];
}

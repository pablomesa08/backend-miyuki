import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsArray, ArrayMinSize, ArrayMaxSize, IsOptional } from "class-validator";

export class UpdateColorsetDto {
    @ApiProperty({description:'The name of the colorset'})
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    @IsOptional()
    readonly name: string;

    @ApiProperty({description:'The list of colors of the colorset'})
    @IsString({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(15)
    @IsOptional()
    readonly colors: string[];
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({description:'The name of the category'})
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;
    
}

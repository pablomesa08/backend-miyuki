import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreatePromotionDto {
    @ApiProperty({description:'The name of the promotion'})
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @ApiProperty({description:'The value of the promotion'})
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(100) 
    readonly value: number;

    @ApiProperty({description:'The availability of the promotion'})
    @IsBoolean()
    readonly isAvailable: boolean;
}

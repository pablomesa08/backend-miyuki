import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsNumber, IsPositive, Min, Max, IsBoolean, IsOptional } from "class-validator";

export class UpdatePromotionDto {
    @ApiProperty({description:'The name of the promotion'})
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsOptional()
    readonly name: string;

    @ApiProperty({description:'The value of the promotion'})
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(100)
    @IsOptional() 
    readonly value: number;

    @ApiProperty({description:'The availability of the promotion'})
    @IsBoolean()
    @IsOptional()
    readonly isAvailable: boolean;
}

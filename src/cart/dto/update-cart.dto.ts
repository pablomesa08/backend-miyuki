import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, IsNumber, IsPositive, IsOptional } from "class-validator";

export class UpdateCartDto {
    @ApiProperty({description:'The user id'})
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly userId: string;

    @ApiProperty({description:'The product id'})
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly productId: string;

    @ApiProperty({description:'The format id'})
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly formatId: string;

    @ApiProperty({description:'The quantity of the product'})
    @IsNumber()
    @IsPositive()
    @IsOptional()
    readonly quantity: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateCartDto {
    @ApiProperty({description:'The user id'})
    @IsString()
    @IsUUID()
    readonly userId: string;

    @ApiProperty({description:'The product id'})
    @IsString()
    @IsUUID()
    readonly productId: string;

    @ApiProperty({description:'The format id'})
    @IsString()
    @IsUUID()
    readonly formatId: string;

    @ApiProperty({description:'The quantity of the product'})
    @IsNumber()
    @IsPositive()
    readonly quantity: number;
}

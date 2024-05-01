import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class FavoritesAuthDto{
    @ApiProperty({description:'The products ids to add to favorites'})
    @IsArray()
    @IsString({each:true})
    readonly productsIds: string[];

}
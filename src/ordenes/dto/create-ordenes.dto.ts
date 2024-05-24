import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrdenesDto {
    @ApiProperty({description:'The id of the promotion code'})
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly promotion: string;
}

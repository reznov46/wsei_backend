import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDeleteDto {
    @ApiProperty()
    @IsString()
    readonly id: string
}

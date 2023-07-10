import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class PlaceOrderDto {
	@ApiProperty()
	@IsUUID()
	@IsNotEmpty()
	productId: string;

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	quantity: number;
}

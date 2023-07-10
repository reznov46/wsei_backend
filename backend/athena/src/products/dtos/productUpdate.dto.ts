import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
	@ApiProperty()
	@IsString()
	readonly id: string;

	@ApiProperty({
		maximum: 64,
	})
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly name: string;
	@ApiProperty({
		maximum: 256,
	})
	@IsString()
	@IsOptional()
	readonly description: string | undefined;

	@ApiProperty({
		maximum: 10000,
	})
	@IsString()
	@IsOptional()
	readonly fullDescription: string | undefined;

	@ApiProperty()
	@IsDecimal()
	@IsOptional()
	readonly price: number;
}

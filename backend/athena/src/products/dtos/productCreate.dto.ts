import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
	@ApiProperty({
		maximum: 64,
	})
	@IsString()
	@IsNotEmpty()
	readonly name: string;
	@ApiProperty({
		maximum: 256,
	})
	@IsString()
	@IsOptional()
	readonly description: string | null;

	@ApiProperty({
		maximum: 10000,
	})
	@IsString()
	@IsOptional()
	readonly fullDescription: string | null;

	@ApiProperty()
	@IsDecimal()
	readonly price: number;

	@ApiProperty({ maximum: 36, minimum: 36 })
	@IsString()
	readonly productCategoryId: string;
}

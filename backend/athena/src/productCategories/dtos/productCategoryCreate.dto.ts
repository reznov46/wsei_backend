import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class ProductCategoryCreateDto {
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
}

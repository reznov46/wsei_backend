import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductFiltersDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly search?: string;

	@ApiProperty()
	@IsDecimal()
	@IsOptional()
	readonly minPrice?: number;

	@ApiProperty()
	@IsDecimal()
	@IsOptional()
	readonly maxPrice?: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly categoryId?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly createdBy?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly createdAfter?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly createdBefore?: string;

	@ApiProperty()
	@IsEnum(['true', 'false', 'null'])
	@IsOptional()
	readonly isDeleted?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly sortBy?: string;

	@ApiProperty()
	@IsEnum(['ASC', 'DESC'])
	@IsNotEmpty()
	@IsOptional()
	readonly sortDirection?: 'ASC' | 'DESC';

	@ApiProperty()
	@IsDecimal()
	@IsNotEmpty()
	@IsOptional()
	readonly pageSize?: number;

	@ApiProperty()
	@IsDecimal()
	@IsNotEmpty()
	@IsOptional()
	readonly page?: number;
}

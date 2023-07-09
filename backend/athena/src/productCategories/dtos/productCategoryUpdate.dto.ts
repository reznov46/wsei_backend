import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductCategoryUpdateDto {
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
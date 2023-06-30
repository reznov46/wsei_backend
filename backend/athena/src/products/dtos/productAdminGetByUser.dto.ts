import { ApiProperty } from '@nestjs/swagger';

export class ProductAdminGetByUserDto {
	@ApiProperty({ maximum: 36 })
	userId: string;
}

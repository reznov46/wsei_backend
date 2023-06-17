import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthVerifyDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly token: string;
}

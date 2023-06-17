import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly username: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly password: string;
}

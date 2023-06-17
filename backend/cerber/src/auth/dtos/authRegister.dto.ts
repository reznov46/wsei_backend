import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
	@IsString()
	@IsNotEmpty()
	readonly username: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;
}

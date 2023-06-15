import { IsNotEmpty, IsString } from 'class-validator';

export class AuthVerifyDto {
	@IsString()
	@IsNotEmpty()
	readonly token: string;
}

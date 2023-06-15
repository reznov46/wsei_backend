import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLoginDto } from '../dtos/authLogin.dto';
import { AuthRegisterDto } from '../dtos/authRegister.dto';
import { AuthVerifyDto } from '../dtos/authVerify.dto';
import TokenPayload from '../token_provider/models/token_payload';
import { UserRemovePasswordInterceptor } from 'src/interceptors/userRemovePassword.interceptor';
import User from 'src/entities/user';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() body: AuthLoginDto): Promise<{ token: string }> {
		const user = await this.authService.validateUser(body.username, body.password);
		if (user == null) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}

		const token = await this.authService.createToken(user);
		if (token == null) {
			throw new HttpException('Cannot create token', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return { token };
	}

	@Post('/register')
	@UseInterceptors(UserRemovePasswordInterceptor)
	async register(@Body() body: AuthRegisterDto): Promise<User> {
		const user = await this.authService.createUser(body.username, body.password);
		if (user == null) {
			throw new HttpException('Cannot register', HttpStatus.CONFLICT);
		}

		return user;
	}

	@Post('/verify')
	@HttpCode(HttpStatus.OK)
	public async handleVerify(@Body() body: AuthVerifyDto): Promise<TokenPayload> {
		const tokenPayload = await this.authService.verify(body.token);
		if (tokenPayload == null) {
			throw new HttpException('Cannot verify token', HttpStatus.UNAUTHORIZED);
		}

		return tokenPayload;
	}
}

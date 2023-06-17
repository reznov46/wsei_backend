import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLoginDto } from '../dtos/authLogin.dto';
import { AuthRegisterDto } from '../dtos/authRegister.dto';
import { AuthVerifyDto } from '../dtos/authVerify.dto';
import TokenPayload from '../token_provider/models/token_payload';
import { UserRemovePasswordInterceptor } from 'src/interceptors/userRemovePassword.interceptor';
import { User } from 'common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Login' })
	@ApiBody({ type: AuthLoginDto })
	@ApiBadRequestResponse()
	@ApiOkResponse({ description: 'Login was successful, token is returned.' })
	@ApiUnauthorizedResponse({ description: 'Provided credentials are invalid.' })
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
	@ApiOperation({ summary: 'Create account' })
	@ApiBody({ type: AuthRegisterDto })
	@ApiBadRequestResponse()
	@ApiOkResponse({ description: 'Account created successfully.' })
	@ApiConflictResponse({ description: 'Username is taken.' })
	async register(@Body() body: AuthRegisterDto): Promise<User> {
		const user = await this.authService.createUser(body.username, body.password);
		if (user == null) {
			throw new HttpException('Cannot register', HttpStatus.CONFLICT);
		}

		return user;
	}

	@Post('/verify')
	@HttpCode(HttpStatus.OK)
	@ApiBody({ type: AuthVerifyDto })
	@ApiOperation({ summary: 'Validate the given token' })
	@ApiBadRequestResponse()
	@ApiOkResponse({ description: 'Token is valid.' })
	@ApiUnauthorizedResponse({ description: 'Provided token is invalid or expired.' })
	public async handleVerify(@Body() body: AuthVerifyDto): Promise<TokenPayload> {
		const tokenPayload = await this.authService.verify(body.token);
		if (tokenPayload == null) {
			throw new HttpException('Cannot verify token', HttpStatus.UNAUTHORIZED);
		}

		return tokenPayload;
	}
}

import {
	defaultRouteWrapper,
	BadRequestDefaultResponse,
	ForbiddenDefaultResponse,
	OkDefaultResponse,
	DefaultResponse,
	Logger,
	InternalErrorDefaultResponse,
} from 'common';
import { Express, Request, Response } from 'express';
import AuthService from '../../services/auth_service/auth_service';
import { LoginError } from '../../services/auth_service/results/login_result';
import { RegisterError } from '../../services/auth_service/results/register_result';
import { VerifyError } from '../../services/auth_service/results/verify_result';

class AuthController {
	constructor(private readonly authService: AuthService) {
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleVerify = this.handleVerify.bind(this);
	}

	private readonly logger = new Logger('AuthController');

	public register(app: Express) {
		app.post('/login', defaultRouteWrapper(this.handleLogin));
		app.post('/register', defaultRouteWrapper(this.handleRegister));
		app.post('/verify', defaultRouteWrapper(this.handleVerify));

		this.logger.info('Registered.');
	}

	private async handleLogin(req: Request, res: Response): Promise<DefaultResponse> {
		if (!req.body) {
			return new BadRequestDefaultResponse();
		}

		const { username, password } = req.body;
		if (!username || !password) {
			return new BadRequestDefaultResponse();
		}

		const result = await this.authService.login(username, password);
		if (result.error != null) {
			switch (result.error) {
				case LoginError.cannotFetchUsers:
					return new InternalErrorDefaultResponse('Cannot fetch the users!');

				case LoginError.credentialsInvalid:
					return new ForbiddenDefaultResponse('Credentials are invalid!');

				case LoginError.cannotGenerateToken:
					return new InternalErrorDefaultResponse('Cannot generate token!');
			}
		}

		const token = result.result;
		if (token == null) {
			this.logger.error('handleLogin, token is null!');
			return new InternalErrorDefaultResponse();
		}

		res.cookie('jwt', token);
		return new OkDefaultResponse({ token });
	}

	private async handleRegister(req: Request): Promise<DefaultResponse> {
		if (!req.body) {
			return new BadRequestDefaultResponse();
		}

		const { username, password } = req.body;
		if (!username || !password) {
			return new BadRequestDefaultResponse();
		}

		const result = await this.authService.register(username, password);
		if (result.error != null) {
			switch (result.error) {
				case RegisterError.cannotFetchUsers:
					return new InternalErrorDefaultResponse('Cannot fetch the users!');

				case RegisterError.usernameTaken:
					return new BadRequestDefaultResponse('Username is taken!');

				case RegisterError.emailTaken:
					return new BadRequestDefaultResponse('Email is taken!');

				case RegisterError.cannotCreateUser:
					return new InternalErrorDefaultResponse('Cannot create the user!');
			}
		}

		const user = result.result;
		if (user == null) {
			this.logger.error('Unexpected result from register!');
			return new InternalErrorDefaultResponse();
		}

		return new OkDefaultResponse({ id: user.id });
	}

	public async handleVerify(req: Request): Promise<DefaultResponse> {
		if (!req.body) {
			return new BadRequestDefaultResponse();
		}

		const { token } = req.body;
		if (!token) {
			return new BadRequestDefaultResponse();
		}

		const result = await this.authService.verify(token);
		if (result.error != null) {
			switch (result.error) {
				case VerifyError.cannotFetchUsers:
					return new InternalErrorDefaultResponse('Cannot fetch the users!');

				case VerifyError.tokenInvalid: {
					return new ForbiddenDefaultResponse('Token is invalid!');
				}
			}
		}

		const user = result.result;
		if (user == null) {
			this.logger.error('Unexpected result from verify!');
			return new InternalErrorDefaultResponse();
		}

		return new OkDefaultResponse({ user });
	}
}

export default AuthController;

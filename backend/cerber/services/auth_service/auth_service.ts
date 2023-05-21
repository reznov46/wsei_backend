import bcyrpt from 'bcryptjs';
import User from '../../models/user';
import TokenProvider from '../../token_provider/interface/token_provider';
import TokenPayload from '../../token_provider/models/token_payload';
import { LoginError, LoginResult } from './results/login_result';
import { RegisterError, RegisterResult } from './results/register_result';
import { VerifyError, VerifyResult } from './results/verify_result';
import { Logger } from '../../../common/common';

const uuid = require('uuid');

class AuthService {
	constructor(private readonly tokenProvider: TokenProvider) {}

	private readonly logger = new Logger('AuthService');

	public async login(username: string, password: string): Promise<LoginResult> {
		const users = await User.findAll({
			where: {
				username,
			},
			attributes: ['id', 'username', 'password'],
			limit: 1,
		});
		if (!users) {
			this.logger.error('Cannot query users!');
			return LoginResult.withError(LoginError.cannotFetchUsers);
		}

		if (users.length < 1) {
			return LoginResult.withError(LoginError.credentialsInvalid);
		}

		const user = users[0];
		if (!user) {
			this.logger.error('Cannot get the user!');
			return LoginResult.withError(LoginError.cannotFetchUsers);
		}

		const passwordMatch = await bcyrpt.compare(password, user.password);
		if (!passwordMatch) {
			this.logger.warning('Password does not match!');
			return LoginResult.withError(LoginError.credentialsInvalid);
		}

		const token = await this.tokenProvider.generateToken({ id: user.id });
		if (!token) {
			this.logger.error('Cannot generate token!');
			return LoginResult.withError(LoginError.cannotGenerateToken);
		}

		return LoginResult.withResult(token);
	}

	public async register(username: string, password: string): Promise<RegisterResult> {
		const users = await User.findAll({
			where: {
				username,
			},
			attributes: ['id', 'username', 'password'],
			limit: 1,
		});
		if (!users) {
			this.logger.error('Cannot query users!');
			return RegisterResult.withError(RegisterError.cannotFetchUsers);
		}

		if (users.length > 0) {
			this.logger.error('User already exists!');
			return RegisterResult.withError(RegisterError.usernameTaken);
		}

		const user = new User({
			id: uuid.v1(),
			username,
			password: await bcyrpt.hash(password, 10),
		});

		const result = await user.save();
		if (!result) {
			this.logger.error('Cannot create user!');
			return RegisterResult.withError(RegisterError.cannotCreateUser);
		}

		return RegisterResult.withResult(result);
	}

	public async verifyTokenPayload(tokenPayload: TokenPayload): Promise<VerifyResult> {
		if (!tokenPayload) {
			this.logger.error('Token payload is empty!');
			return VerifyResult.withError(VerifyError.tokenInvalid);
		}

		const { id } = tokenPayload;
		if (!id) {
			this.logger.error('Token has no id!');
			return VerifyResult.withError(VerifyError.tokenInvalid);
		}

		const users = await User.findAll({
			where: {
				id,
			},
			attributes: {
				exclude: ['password'],
			},
			limit: 1,
		});
		if (!users) {
			this.logger.error('Cannot query users!');
			return VerifyResult.withError(VerifyError.cannotFetchUsers);
		}

		if (users.length < 1) {
			this.logger.error('No matching user!');
			return VerifyResult.withError(VerifyError.tokenInvalid);
		}

		const user = users[0];
		if (!user) {
			this.logger.error('Cannot get the user!');
			return VerifyResult.withError(VerifyError.cannotFetchUsers);
		}

		return VerifyResult.withResult(user);
	}

	public async verify(token: string): Promise<VerifyResult> {
		const tokenPayload = await this.tokenProvider.verifyToken(token);
		if (!tokenPayload) {
			this.logger.error('Cannot verify token!');
			return VerifyResult.withError(VerifyError.tokenInvalid);
		}

		return this.verifyTokenPayload(tokenPayload);
	}
}

export default AuthService;

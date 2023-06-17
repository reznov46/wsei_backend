import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserLevel } from 'common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenProvider } from '../token_provider/interface/token_provider';
import TokenPayload from '../token_provider/models/token_payload';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		@Inject(TokenProvider) private readonly tokenProvider: TokenProvider,
	) {}

	// private readonly logger = new Logger('AuthService');

	public async validateUser(username: string, password: string): Promise<User | null> {
		const user = await this.usersRepository.findOneBy({
			username,
		});
		if (user == null) {
			return null;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return null;
		}

		return user;
	}

	public async createUser(username: string, password: string): Promise<User | null> {
		const sameUsernameUsers = await this.usersRepository.findOneBy({
			username,
		});
		if (sameUsernameUsers != null) {
			return null;
		}

		const user = this.usersRepository.create({
			username,
			password: await bcrypt.hash(password, 10),
			level: UserLevel.user,
		});

		return this.usersRepository.save(user);
	}

	public async createToken(user: User): Promise<string | null> {
		const token = await this.tokenProvider.generateToken({
			id: user.id,
		});
		if (!token) {
			// this.logger.error('createToken, cannot generate token!');
			return null;
		}

		return token;
	}

	public async verify(token: string): Promise<TokenPayload | null> {
		const tokenPayload = await this.tokenProvider.verifyToken(token);
		if (!tokenPayload) {
			// this.logger.error('verify, cannot verify token!');

			return null;
		}

		return tokenPayload;
	}
}

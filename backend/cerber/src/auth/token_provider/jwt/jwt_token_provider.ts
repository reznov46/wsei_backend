import jwt from 'jsonwebtoken';
import TokenPayload from '../models/token_payload';
import { Injectable } from '@nestjs/common';
import { TokenProvider } from '../interface/token_provider';
import { GetEnv, Logger } from 'common';
import { Env } from 'src/env/model/env';

@Injectable()
class JwtTokenProvider implements TokenProvider {
	constructor(@GetEnv env: Env) {
		this.secret = env.jwtSecret;
		this.expirationTime = env.jwtExpirationTime;
	}

	private readonly logger = new Logger('JwtTokenProvider');

	private readonly secret: string;
	private readonly expirationTime: number;

	async generateToken(payload: TokenPayload): Promise<string | null> {
		try {
			return jwt.sign(payload, this.secret, { expiresIn: `${this.expirationTime}s` });
		} catch (error) {
			this.logger.trace(`generateToken, ${error}`);

			return null;
		}
	}

	async verifyToken(token: string): Promise<TokenPayload | null> {
		try {
			const decoded = jwt.verify(token, this.secret);
			if (typeof decoded !== 'object') {
				this.logger.error('verifyToken, cannot decode token!');
				return null;
			}

			return decoded;
		} catch (error) {
			this.logger.trace(`verifyToken, ${error}`);
			return null;
		}
	}
}

export default JwtTokenProvider;

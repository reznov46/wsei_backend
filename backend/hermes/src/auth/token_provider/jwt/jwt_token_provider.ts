import jwt from 'jsonwebtoken';
import TokenPayload from '../models/token_payload';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TokenProvider } from '../interface/token_provider';

@Injectable()
class JwtTokenProvider implements TokenProvider, OnModuleInit, OnModuleDestroy {
	// private readonly logger = new Logger('JwtTokenProvider');

	private secret: string;
	private expirationTime: string;

	onModuleInit() {
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			// this.logger.error('onModuleInit, cannot get JWT secret!');

			throw new Error('Cannot get JWT secret!');
		}

		const expirationTime = process.env.JWT_EXPIRATION_TIME;
		if (!expirationTime) {
			// this.logger.error('onModuleInit, cannot get JWT expiration time!');

			throw new Error('Cannot get JWT expiration time!');
		}

		this.secret = secret;
		this.expirationTime = expirationTime;

		// this.logger.info('onModuleInit, initialized.');
	}

	onModuleDestroy() {
		this.secret = '';
		this.expirationTime = '';

		// this.logger.info('onModuleDestroy, closed.');
	}

	async generateToken(payload: TokenPayload): Promise<string | null> {
		try {
			return jwt.sign(payload, this.secret, { expiresIn: `${this.expirationTime}s` });
		} catch (error) {
			// this.logger.trace(`generateToken, ${error}`);

			return null;
		}
	}

	async verifyToken(token: string): Promise<TokenPayload | null> {
		try {
			const decoded = jwt.verify(token, this.secret);
			if (typeof decoded !== 'object') {
				// this.logger.error('verifyToken, cannot decode token!');
				return null;
			}

			return decoded;
		} catch (error) {
			// this.logger.trace(`verifyToken, ${error}`);
			return null;
		}
	}

	getTokenPayload(token: string): TokenPayload {
		try {
			const decoded = jwt.decode(token);
			if (typeof decoded !== 'object') {
				// this.logger.error('verifyToken, cannot decode token!');
				return null;
			}

			return decoded;
		} catch (error) {
			// this.logger.trace(`verifyToken, ${error}`);
			return null;
		}
	}
}

export default JwtTokenProvider;

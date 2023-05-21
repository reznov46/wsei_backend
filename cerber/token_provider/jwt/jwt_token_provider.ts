import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenProvider from '../interface/token_provider';
import TokenPayload from '../models/token_payload';
import { Logger } from '../../../common/common';

class JwtTokenProvider implements TokenProvider {
	private readonly logger = new Logger('JwtTokenProvider');

	private secret: string;
	private expirationTime: string;

	async init(): Promise<boolean> {
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			this.logger.error('Cannot get JWT secret!');
			return false;
		}

		const expirationTime = process.env.JWT_EXPIRATION_TIME;
		if (!expirationTime) {
			this.logger.error('Cannot get JWT expiration time!');
			return false;
		}

		this.secret = secret;
		this.expirationTime = expirationTime;

		this.logger.info('Initialized.');
		return true;
	}

	async close(): Promise<boolean> {
		this.secret = '';
		this.expirationTime = '';

		this.logger.info('Closed.');
		return true;
	}

	async generateToken(payload: TokenPayload): Promise<string | null> {
		return jwt.sign(payload, this.secret, { expiresIn: `${this.expirationTime}s` });
	}

	async verifyToken(token: string): Promise<TokenPayload | null> {
		const decoded = jwt.verify(token, this.secret);
		if (typeof decoded !== 'object') {
			this.logger.error('Cannot decode token!');
			return null;
		}

		return decoded;
	}

	middleware(): (req: Request, res: Response, next: any) => Promise<void> {
		return async (req: Request, res: Response, next: any) => {
			const token = req.cookies.jwt;
			if (!token) {
				this.logger.info('middleware, no token provided!');
				return next();
			}

			if (typeof token !== 'string') {
				this.logger.error('middleware, token is not a string!');
				return next();
			}

			req.tokenPayload = await this.verifyToken(token);
			if (!req.tokenPayload) {
				this.logger.warning('middleware, invalid token!');
				return next();
			}

			res.cookie('payload', req.tokenPayload);
			return next();
		};
	}
}

export default JwtTokenProvider;

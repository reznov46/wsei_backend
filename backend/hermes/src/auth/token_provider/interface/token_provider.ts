import TokenPayload from '../models/token_payload';

export interface TokenProvider {
	generateToken(data: TokenPayload): Promise<string | null>;
	verifyToken(token: string): Promise<TokenPayload | null>;

	getTokenPayload(token: string): TokenPayload | null;
}

export const TokenProvider = Symbol('TokenProvider');

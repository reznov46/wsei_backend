import TokenPayload from '../models/token_payload';

export interface TokenProvider {
	generateToken(data: TokenPayload): Promise<string | null>;
	verifyToken(token: string): Promise<TokenPayload | null>;
}

export const TokenProvider = Symbol('TokenProvider');

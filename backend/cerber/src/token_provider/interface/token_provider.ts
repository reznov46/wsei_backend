import { Request, Response } from 'express';
import TokenPayload from '../models/token_payload';

interface TokenProvider {
	init(): Promise<boolean>;
	close(): Promise<boolean>;

	generateToken(data: TokenPayload): Promise<string | null>;
	verifyToken(token: string): Promise<TokenPayload | null>;

	middleware(): (req: Request, res: Response, next: any) => Promise<void>;
}

export default TokenProvider;

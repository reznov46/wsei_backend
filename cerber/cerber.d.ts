import TokenPayload from './token_provider/models/token_payload';

// Make the file a module to avoid the TypeScript error.
export {};

declare global {
	namespace Express {
		export interface Request {
			tokenPayload: TokenPayload | undefined;
		}
	}
}

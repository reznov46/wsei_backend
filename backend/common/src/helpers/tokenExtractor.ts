import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenExtractor {
	public extractTokenFromHeaders(headers: { [key: string]: string }): string | null {
		const authorizationHeader = headers['authorization'];
		if (authorizationHeader == null) {
			return null;
		}

		const [type, token] = authorizationHeader.split(' ');
		if (type !== 'Bearer') {
			return null;
		}

		return token;
	}
}

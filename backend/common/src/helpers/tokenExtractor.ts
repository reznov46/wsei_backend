import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenExtractor {
	public extractTokenFromHeaders(headers: Headers): string | null {
		const authorizationHeader = headers.get('authorization');
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

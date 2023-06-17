import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/common';

@Injectable()
export class TokenExtractor {
	public extractTokenFromHeaders(headers: Dictionary<string>): string | null {
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

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenExtractor } from 'src/helpers/tokenExtractor';

export const Token = createParamDecorator<void, ExecutionContext, string | null>(
	(data: void, ctx: ExecutionContext) => {
		const tokenExtractor = new TokenExtractor();

		const request = ctx.switchToHttp().getRequest();
		return tokenExtractor.extractTokenFromHeaders(request.headers);
	},
);

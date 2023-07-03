import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/models/user';

export const GetUser = createParamDecorator<void, ExecutionContext, User | null>(
	(data: void, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);

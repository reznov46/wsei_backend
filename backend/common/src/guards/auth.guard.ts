import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { User, UserLevelComparable } from '../models/user';
import { TokenExtractor } from '../helpers/tokenExtractor';
import { Logger } from '../logger/logger';
import { GetEnv } from '../modules/config/getEnv.decorator';
import { EnvInterface } from '../modules/config/interfaces/env.interface';

export const AuthGuard = (minimumLevel: UserLevelComparable) => {
	@Injectable()
	class AuthGuardMixin implements CanActivate {
		constructor(
			readonly tokenExtractor: TokenExtractor,
			readonly httpService: HttpService,
			@GetEnv readonly env: EnvInterface,
		) {}

		readonly logger = new Logger('AuthGuard');

		async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest();
			const token = this.tokenExtractor.extractTokenFromHeaders(request.headers as { [key: string]: string });
			if (token == null) {
				this.logger.error(`canActivate, token is null!`);

				return false;
			}

			const response = await lastValueFrom(
				this.httpService.get<User>('user-by-token', {
					baseURL: this.env.isDebug ? 'http://localhost:3001' : 'https://cerber:3001',
					params: {
						token,
					},
				}),
			);
			if (response.status != 200) {
				this.logger.error(`canActivate, response status code is not 200 (${response.status})!`);

				return false;
			}

			const user = response.data;
			if (UserLevelComparable.fromUserLevel(user.level) < minimumLevel) {
				this.logger.warning(`canActivate, level is to low!`);
				return false;
			}
			request.user = user;
			return true;
		}
	}

	return mixin(AuthGuardMixin);
};

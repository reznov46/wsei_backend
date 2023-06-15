import { CanActivate, ExecutionContext, Inject, Injectable, mixin } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenProvider } from 'src/auth/token_provider/interface/token_provider';
import User, { UserLevelComparable } from 'src/entities/user';
import { TokenExtractor } from 'src/helpers/tokenExtractor';
import { Repository } from 'typeorm';

export const AuthGuard = (minimumLevel: UserLevelComparable) => {
	class AuthGuardMixin implements CanActivate {
		constructor(
			@Inject(TokenProvider) readonly tokenProvider: TokenProvider,
			@InjectRepository(User) readonly usersRepository: Repository<User>,
			readonly tokenExtractor: TokenExtractor,
		) {}

		async canActivate(context: ExecutionContext): Promise<boolean> {
			const request = context.switchToHttp().getRequest() as Request;
			const token = this.tokenExtractor.extractTokenFromHeaders(request.headers);

			const payload = await this.tokenProvider.verifyToken(token);
			if (payload == null) {
				return false;
			}

			const { id } = payload;
			if (id == null) {
				return false;
			}

			const user = await this.usersRepository.findOne({
				where: {
					id,
				},
				select: {
					level: true,
				},
			});
			if (user == null) {
				return false;
			}

			if (user.levelComparable < minimumLevel) {
				return false;
			}

			return true;
		}
	}

	return mixin(AuthGuardMixin);
};

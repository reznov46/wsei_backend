import { ArgumentMetadata, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenProvider } from 'src/auth/token_provider/interface/token_provider';
import User from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class TokenToUserPipe implements PipeTransform {
	public constructor(
		@Inject(TokenProvider) private readonly tokenProvider: TokenProvider,
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) {}

	public async transform(token: string, _metadata: ArgumentMetadata): Promise<User | null> {
		const payload = await this.tokenProvider.verifyToken(token);
		if (payload == null) {
			return null;
		}

		const { id } = payload;
		if (id == null) {
			return null;
		}

		const user = await this.usersRepository.findOne({
			where: {
				id,
			},
		});
		if (user == null) {
			return null;
		}

		return user;
	}
}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenProvider } from 'src/auth/token_provider/interface/token_provider';
import JwtTokenProvider from 'src/auth/token_provider/jwt/jwt_token_provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenExtractor, User } from 'common';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [
		UsersService,
		{
			provide: TokenProvider,
			useClass: JwtTokenProvider,
		},
		TokenExtractor,
	],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtTokenProvider from './token_provider/jwt/jwt_token_provider';
import { TokenProvider } from './token_provider/interface/token_provider';
import { User } from 'common';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: TokenProvider,
			useClass: JwtTokenProvider,
		},
	],
})
export class AuthModule {}

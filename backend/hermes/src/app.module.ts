import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import User from './entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TokenExtractor } from './helpers/tokenExtractor';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			// Override host to localhost if not running in Docker.
			host: process.env.DOCKER ? process.env.DATABASE_HOST! : 'localhost',
			username: process.env.DATABASE_USER!,
			password: process.env.DATABASE_PASSWORD!,
			database: process.env.DATABASE_DB_NAME!,
			entities: [User],
			// synchronize: true,
			logging: true,
		}),
		AuthModule,
		UsersModule,
	],
	providers: [TokenExtractor],
})
export class AppModule {}

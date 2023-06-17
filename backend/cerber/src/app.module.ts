import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ENV_PROVIDER_TOKEN, EnvModule, GetEnv, TokenExtractor, User } from 'common';
import { Env } from './env/model/env';
import { EnvFactory } from './env/factory/envFactory';

@Module({
	imports: [
		EnvModule.forRoot<Env>({
			isGlobal: true,
			factory: new EnvFactory().build,
		}),
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [ENV_PROVIDER_TOKEN],
			useFactory: (env: Env) => ({
				type: 'mysql',
				// Override host to localhost if not running in Docker.
				host: process.env.DOCKER ? env.databaseHost : 'localhost',
				username: env.databaseUser,
				password: env.databasePassword,
				database: env.databaseDbName,
				entities: [User],
				// synchronize: true,
				logging: true,
			}),
		}),
		AuthModule,
		UsersModule,
	],
	providers: [TokenExtractor],
})
export class AppModule {}

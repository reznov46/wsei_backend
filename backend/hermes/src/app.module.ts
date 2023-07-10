import { Module } from '@nestjs/common';
import { ENV_PROVIDER_TOKEN, EnvModule, TokenExtractor } from 'common';
import { EnvFactory } from './env/factory/envFactory';
import { Env } from './env/model/env';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		EnvModule.forRoot({
			isGlobal: true,
			factory: new EnvFactory().build,
		}),
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			inject: [ENV_PROVIDER_TOKEN],
			useFactory: (env: Env) => ({
				type: 'mysql',
				// Override host to localhost if not running in Docker.
				host: env.isDebug ? 'localhost' : env.databaseHost,
				username: env.databaseUser,
				password: env.databasePassword,
				database: env.databaseDbName,
				// synchronize: true,
				logging: true,
			}),
		}),
	],
	controllers: [],
	providers: [TokenExtractor],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ENV_PROVIDER_TOKEN, EnvModule, Product, TokenExtractor } from 'common';
import { EnvFactory } from './env/factory/envFactory';
import { Env } from './env/model/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

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
				host: process.env.DOCKER ? env.databaseHost : 'localhost',
				username: env.databaseUser,
				password: env.databasePassword,
				database: env.databaseDbName,
				entities: [Product],
				// synchronize: true,
				logging: true,
			}),
		}),
		ProductsModule,
	],
	controllers: [],
	providers: [TokenExtractor],
})
export class AppModule {}
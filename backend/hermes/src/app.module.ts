import { Module } from '@nestjs/common';
import { ENV_PROVIDER_TOKEN, EnvModule, Order, TokenExtractor } from 'common';
import { EnvFactory } from './env/factory/envFactory';
import { Env } from './env/model/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

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
				entities: [Order],
				// synchronize: true,
				logging: true,
			}),
		}),
		OrdersModule,
	],
	controllers: [],
	providers: [TokenExtractor],
})
export class AppModule {}

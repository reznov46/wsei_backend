import { DynamicModule, ExistingProvider, Module, ValueProvider } from '@nestjs/common';
import { EnvModuleConfig } from './types/envModuleConfig';
import { Logger } from '../../logger/logger';
import { Dictionary } from '../../types/dictionary';
import { ENV_PROVIDER_TOKEN } from './env.constants';

import dotenv from 'dotenv';
dotenv.config();

@Module({})
export class EnvModule {
	private static readonly logger = new Logger('EnvModule');

	static forRoot<T>(config: EnvModuleConfig<T>): DynamicModule {
		const env = config.factory(process.env as Dictionary<string>);
		if (env == null) {
			this.logger.fatal('forRoot, cannot build env!');

			throw new Error('Cannot build env!');
		}

		this.logger.info('forRoot, env parsed and registered!');
		const envProvider: ValueProvider<T> = {
			provide: ENV_PROVIDER_TOKEN,
			useValue: env,
		};

		return {
			global: config.isGlobal,
			module: EnvModule,
			providers: [envProvider],
			exports: [envProvider],
		};
	}
}

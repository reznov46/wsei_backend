import { Inject } from '@nestjs/common';
import { ENV_PROVIDER_TOKEN } from './env.constants';

export const GetEnv: ReturnType<typeof Inject> = Inject(ENV_PROVIDER_TOKEN);

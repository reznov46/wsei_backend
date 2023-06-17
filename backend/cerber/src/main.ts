import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ENV_PROVIDER_TOKEN } from 'common';
import { Env } from './env/model/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());

	const env: Env = app.get(ENV_PROVIDER_TOKEN);
	await app.listen(env.port);
}

bootstrap();

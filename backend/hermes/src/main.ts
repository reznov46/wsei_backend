import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Env } from './env/model/env';
import { ENV_PROVIDER_TOKEN } from 'common';
import { registerSwagger } from './swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	registerSwagger(app);

	app.useGlobalPipes(new ValidationPipe());

	const env: Env = app.get(ENV_PROVIDER_TOKEN);
	app.enableCors({ origin: env.frontendAddress, credentials: true });

	await app.listen(env.port);
}

bootstrap();

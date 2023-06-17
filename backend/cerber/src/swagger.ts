import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const registerSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Cerber')
		.setDescription('Authentication microservice')
		.setVersion('1.0.0')
		.addTag('auth')
		.addTag('users')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('swagger', app, document);
};

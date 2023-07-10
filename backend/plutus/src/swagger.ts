import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const registerSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Plutus')
		.setDescription('Payments microservice')
		.setVersion('1.0.0')
		.addTag('payments')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('swagger', app, document);
};

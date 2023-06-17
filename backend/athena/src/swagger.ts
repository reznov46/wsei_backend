import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const registerSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Athena')
		.setDescription('Products microservice')
		.setVersion('1.0')
		.addTag('products')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('swagger', app, document);
};

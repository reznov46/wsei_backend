import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonAuthModule, Product, TokenExtractor } from 'common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product]), CommonAuthModule],
	controllers: [ProductsController],
	providers: [ProductsService, TokenExtractor],
})
export class ProductsModule {}

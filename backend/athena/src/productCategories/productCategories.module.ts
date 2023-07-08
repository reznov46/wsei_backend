import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonAuthModule, ProductCategory, TokenExtractor } from 'common';
import { ProductCategoriesController } from './controller/productCategories.controller';
import { ProductCategoriesService } from './service/productCategories.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProductCategory]), CommonAuthModule],
	controllers: [ProductCategoriesController],
	providers: [ProductCategoriesService, TokenExtractor],
})
export class ProductCategoriesModule {}

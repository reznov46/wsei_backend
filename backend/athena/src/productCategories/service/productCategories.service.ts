import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory, User } from 'common';
import { ProductCategoryCreateDto } from '../dtos/productCategoryCreate.dto';

@Injectable()
export class ProductCategoriesService {
	constructor(
		@InjectRepository(ProductCategory) private readonly productCategoriesRepository: Repository<ProductCategory>,
	) {}

	public async get(): Promise<ProductCategory[] | null> {
		return await this.productCategoriesRepository.findBy({ isDeleted: false });
	}

	create(body: ProductCategoryCreateDto, user: User) {
		const { name, description } = body;
		const newProductCategory: ProductCategory = {
			name,
			createdAt: new Date(),
			createdBy: user.id,
		};

		if (description) {
			newProductCategory.description = description;
		}

		const response = this.productCategoriesRepository.create(newProductCategory);
		this.productCategoriesRepository.save(response);
	}
}

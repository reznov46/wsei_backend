import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory, User } from 'common';
import { ProductCategoryCreateDto } from '../dtos/productCategoryCreate.dto';
import { ProductCategoryUpdateDto } from '../dtos/productCategoryUpdate.dto';

@Injectable()
export class ProductCategoriesService {
	constructor(
		@InjectRepository(ProductCategory) private readonly productCategoriesRepository: Repository<ProductCategory>,
	) {}

	public async get(): Promise<Partial<ProductCategory[]> | null> {
		return await this.productCategoriesRepository.find({
			where: { isDeleted: false },
			select: ['id', 'name', 'description'],
		});
	}

	create(body: ProductCategoryCreateDto, user: User) {
		const { name, description } = body;
		const newProductCategory: ProductCategory = {
			name,
			createdAt: new Date(),
			createdBy: user.id,
			isDeleted: false,
		};

		if (description) {
			newProductCategory.description = description;
		}

		const response = this.productCategoriesRepository.create(newProductCategory);
		this.productCategoriesRepository.save(response);
	}

	async update(id: string, body: ProductCategoryUpdateDto) {
		const { name, description } = body;
		const existringCategory = await this.productCategoriesRepository.findOneBy({ id });

		if (existringCategory == null) {
			return null;
		}

		existringCategory.name = name ?? existringCategory.name;
		existringCategory.description = description ?? existringCategory.description;

		this.productCategoriesRepository.update({ id }, existringCategory);
	}

	async delete(id: string) {
		const existringCategory = await this.productCategoriesRepository.findOneBy({ id });

		if (existringCategory == null) {
			return null;
		}

		existringCategory.isDeleted = true;
		this.productCategoriesRepository.update({ id }, existringCategory);
	}
}

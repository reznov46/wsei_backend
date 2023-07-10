import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductCategory, User, stringToBool } from 'common';
import { Brackets, Repository } from 'typeorm';
import { ProductCreateDto } from '../dtos/productCreate.dto';
import { ProductUpdateDto } from '../dtos/productUpdate.dto';
import { ProductFiltersDto } from '../dtos/productFilters.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
	public async get(filters: ProductFiltersDto): Promise<Product[] | null> {
		const search = filters.search?.trim().toLowerCase();

		let queryBuilder = this.productRepository.createQueryBuilder('products');
		queryBuilder = queryBuilder
			.leftJoin('productCategories', 'categories', 'categories.id = products.product_category_id')
			.addSelect('categories.id', 'categoryId')
			.addSelect('categories.name', 'categoryName');

		if (search != null && search.length > 0) {
			queryBuilder = queryBuilder.where(
				new Brackets((queryBuilder) =>
					queryBuilder
						.orWhere('LOWER(`products`.`name`) LIKE :search', { search: `%${search}%` })
						.orWhere('LOWER(`products`.`description`) LIKE :search', { search: `%${search}%` })
						.orWhere('LOWER(`products`.`full_description`) LIKE :search', { search: `%${search}%` }),
				),
			);
		}

		if (filters.minPrice != null) {
			queryBuilder = queryBuilder.andWhere('`price` >= :minPrice', { minPrice: filters.minPrice });
		}

		if (filters.maxPrice != null) {
			queryBuilder = queryBuilder.andWhere('`price` <= :maxPrice', { maxPrice: filters.maxPrice });
		}

		if (filters.categoryId != null) {
			queryBuilder = queryBuilder.andWhere('`product_category_id` = :categoryId', { categoryId: filters.categoryId });
		}

		if (filters.createdBy != null) {
			queryBuilder = queryBuilder.andWhere('`created_by` = :createdBy', { createdBy: filters.createdBy });
		}

		if (filters.createdAfter != null) {
			queryBuilder = queryBuilder.andWhere('`created_at` >= :createdAfter', { createdAfter: filters.createdAfter });
		}

		if (filters.createdBefore != null) {
			queryBuilder = queryBuilder.andWhere('`created_at` <= :createdBefore', { createdBefore: filters.createdBefore });
		}

		if (filters.sortBy != null && filters.sortDirection != null) {
			queryBuilder = queryBuilder.orderBy(filters.sortBy, filters.sortDirection);
		}

		if (filters.isDeleted !== 'null') {
			queryBuilder = queryBuilder.andWhere('`products`.`is_deleted` = :isDeleted', {
				isDeleted: stringToBool(filters.isDeleted) ?? false,
			});
		}

		const products = await queryBuilder.getRawAndEntities();

		return products.entities.map((product, i) => {
			const category = plainToClass(ProductCategory, {
				id: products.raw[i].categoryId,
				name: products.raw[i].categoryName,
			});

			product.productCategory = category;

			return product;
		});
	}

	public async getOne(id: string): Promise<Product | null> {
		return await this.productRepository.findOne({
			select: {
				productCategory: {
					name: true,
					id: true,
				},
			},
			relations: {
				productCategory: true,
			},
			where: { id },
		});
	}

	public async create(product: ProductCreateDto, { id }: User) {
		const { name, description, fullDescription, price, productCategoryId } = product;
		const newProduct: Product = {
			name,
			price,
			productCategory: Object.assign(new ProductCategory(), { id: productCategoryId }),
			createdAt: new Date(),
			createdBy: id,
			isDeleted: false,
		};
		if (description) {
			newProduct.description = description;
		}
		if (fullDescription) {
			newProduct.fullDescription = fullDescription;
		}
		const response = this.productRepository.create(newProduct);
		this.productRepository.save(response);
	}

	public async patch(product: ProductUpdateDto, user: User) {
		const oldProduct = await this.productRepository.findOneBy({ id: product.id, createdBy: user.id });

		if (oldProduct == null) {
			return;
		}

		const { name, description, fullDescription, price } = product;
		if (
			name === oldProduct.name &&
			description === oldProduct.description &&
			fullDescription === oldProduct.fullDescription &&
			price === oldProduct.price
		) {
			return;
		}

		if (name) {
			oldProduct.name = name;
		}

		if (price) {
			oldProduct.price = price;
		}

		oldProduct.description = description;
		oldProduct.fullDescription = fullDescription;
		this.productRepository.update({ id: product.id }, oldProduct);
	}

	public async delete(productId: string, user: User) {
		const oldProduct = await this.productRepository.findOneBy({ id: productId, createdBy: user.id });

		if (oldProduct == null) {
			return;
		}

		oldProduct.isDeleted = true;
		this.productRepository.update({ id: oldProduct.id }, oldProduct);
	}
}

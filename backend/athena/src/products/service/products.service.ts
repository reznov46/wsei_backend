import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, User } from 'common';
import { Equal, Not, Repository } from 'typeorm';
import { ProductCreateDto } from '../dtos/productCreate.dto';
import { ProductDeleteDto } from '../dtos/productDelete.dto';
import { ProductUpdateDto } from '../dtos/productUpdate.dto';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
	public async get(createdBy: string): Promise<Product[] | null> {
		return await this.productRepository.findBy({ createdBy: Equal(createdBy), isDeleted: Equal(false) });
	}
	public async create(product: ProductCreateDto, { id }: User) {
		const { name, description, fullDescription, price } = product;
		const newProduct: Product = {
			name,
			price,
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
		oldProduct.updatedAt = new Date();
		oldProduct.updatedBy = user.id;
		this.productRepository.update({ id: product.id }, oldProduct);
		this.productRepository.save(oldProduct);
	}
	public async delete(product: ProductDeleteDto, user: User) {
		const oldProduct = await this.productRepository.findOneBy({ id: product.id, createdBy: user.id });
		if (oldProduct == null) {
			return;
		}
		oldProduct.isDeleted = true;
	}
}

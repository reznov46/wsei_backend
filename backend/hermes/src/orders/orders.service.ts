import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, Product, User } from 'common';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
	constructor(@InjectRepository(Order) private readonly ordersRepository: Repository<Order>) {}

	public async create(product: Product, quantity: number, user: User): Promise<Order> {
		const productId = product.id;
		if (!productId) {
			throw new Error('Product id is null');
		}

		const response = this.ordersRepository.create({
			productId,
			quantity,
			totalPrice: product.price * quantity,
			boughtAt: new Date(),
			boughtBy: user.id,
		});

		return await this.ordersRepository.save(response);
	}
}

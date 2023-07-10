import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard, GetUser, Order, ProductsRepository, User, UserLevelComparable } from 'common';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from './dtos/placeOrderDto';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService, private readonly productsRepository: ProductsRepository) {}

	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async getAll(): Promise<Order[]> {
		return [];
	}

	@Get('/:id')
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async getOne(@Param() params: { id: string }): Promise<Order> {
		// const product = await this.productService.getOne(params.id);
		// if (product == null) {
		throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
		// }

		// return product;
	}

	@Post()
	@HttpCode(204)
	@ApiOperation({ summary: 'Creates product' })
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async create(@GetUser() user: User, @Body() body: PlaceOrderDto): Promise<Order> {
		const product = await this.productsRepository.getProduct(body.productId);
		if (product == null) {
			throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
		}

		const order = await this.ordersService.create(product, body.quantity, user);
		if (order == null) {
			throw new HttpException('Cannot create order not created', HttpStatus.BAD_REQUEST);
		}

		// Todo: Create payment in plutus.

		return order;
	}
}

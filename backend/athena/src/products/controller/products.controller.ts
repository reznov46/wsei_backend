import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard, GetUser, Product, User, UserLevelComparable } from 'common';
import { ProductCreateDto } from '../dtos/productCreate.dto';
import { ProductUpdateDto } from '../dtos/productUpdate.dto';
import { ProductsService } from '../service/products.service';
import { ProductAdminGetByUserDto } from '../dtos/productAdminGetByUser.dto';

@Controller('products')
export class ProductsController {
	constructor(private productService: ProductsService) {}
	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async get(@GetUser() user: User): Promise<Product[] | null> {
		const products = this.productService.get(user.id);
		return products;
	}

	// @Get('admin/:userId')
	// @UseGuards(AuthGuard(UserLevelComparable.admin))
	// async getForUser(@Param() params: ProductAdminGetByUserDto) {
	// 	return this.productService.get(params.userId);
	// }

	@Post()
	@HttpCode(204)
	@ApiOperation({ summary: 'Creates product' })
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async create(@GetUser() user: User, @Body() body: ProductCreateDto) {
		this.productService.create(body, user);
	}

	@Patch()
	@HttpCode(204)
	@ApiOperation({ summary: 'Updates properties on existing product' })
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async patch(@GetUser() user: User, @Body() body: ProductUpdateDto) {
		this.productService.patch(body, user);
	}

	@Delete('/:id')
	@HttpCode(204)
	@ApiOperation({ summary: 'Deletes the record from users visibility' })
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async delete(@GetUser() user: User, @Param() params: { id: string }) {
		this.productService.delete(params.id, user);
	}
}

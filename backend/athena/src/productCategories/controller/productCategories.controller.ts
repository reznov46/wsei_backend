import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, GetUser, ProductCategory, User, UserLevelComparable } from 'common';
import { ProductCategoryCreateDto } from '../dtos/productCategoryCreate.dto';
import { ProductCategoryUpdateDto } from '../dtos/productCategoryUpdate.dto';
import { ProductCategoriesService } from '../service/productCategories.service';

@Controller('productCategories')
export class ProductCategoriesController {
	constructor(private productCategoriesService: ProductCategoriesService) {}
	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async get(@GetUser() user: User): Promise<Partial<ProductCategory[]> | null> {
		const productCategories = this.productCategoriesService.get();
		return productCategories;
	}

	@Post()
	@HttpCode(204)
	@UseGuards(AuthGuard(UserLevelComparable.admin))
	async create(@GetUser() user: User, @Body() body: ProductCategoryCreateDto) {
		this.productCategoriesService.create(body, user);
	}

	@Patch('/:id')
	@HttpCode(204)
	@UseGuards(AuthGuard(UserLevelComparable.admin))
	async update(@Param() params: { id: string }, @Body() body: ProductCategoryUpdateDto) {
		this.productCategoriesService.update(params.id, body);
	}

	@Delete('/:id')
	@HttpCode(204)
	@UseGuards(AuthGuard(UserLevelComparable.admin))
	async delete(@Param() params: { id: string }) {
		this.productCategoriesService.delete(params.id);
	}
}

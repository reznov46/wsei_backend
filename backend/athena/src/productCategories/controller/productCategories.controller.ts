import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, GetUser, ProductCategory, User, UserLevelComparable } from 'common';
import { ProductCategoryCreateDto } from '../dtos/productCategoryCreate.dto';
import { ProductCategoriesService } from '../service/productCategories.service';

@Controller()
export class ProductCategoriesController {
	constructor(private productCategoriesService: ProductCategoriesService) {}
	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async get(@GetUser() user: User): Promise<ProductCategory[] | null> {
		const productCategories = this.productCategoriesService.get();
		return productCategories;
	}

	@Post("getALl")
	@HttpCode(204)
	@UseGuards(AuthGuard(UserLevelComparable.admin))

	async create(@GetUser() user: User, @Body() body: ProductCategoryCreateDto)
	{
		console.log("elomelo")
		this.productCategoriesService.create(body, user);
	}

}



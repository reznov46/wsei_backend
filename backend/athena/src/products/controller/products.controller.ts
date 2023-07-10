import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard, GetUser, Product, User, UserLevelComparable } from 'common';
import { ProductCreateDto } from '../dtos/productCreate.dto';
import { ProductUpdateDto } from '../dtos/productUpdate.dto';
import { ProductsService } from '../service/products.service';
import { ProductFiltersDto } from '../dtos/productFilters.dto';

@Controller('products')
export class ProductsController {
	constructor(private productService: ProductsService) {}
	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async getAll(@GetUser() user: User, @Query() filters: ProductFiltersDto): Promise<Product[] | null> {
		if (filters.isDeleted === 'true') {
			const isAdmin = UserLevelComparable.fromUserLevel(user.level) >= UserLevelComparable.admin;
			if (!filters.createdBy && !isAdmin) {
				throw new HttpException('createdBy must be specified to you when isDeleted is true', HttpStatus.FORBIDDEN);
			}

			if (filters.createdBy !== user.id && !isAdmin) {
				throw new HttpException('You can only view your own deleted products', HttpStatus.FORBIDDEN);
			}
		}

		if (filters.sortBy || filters.sortDirection) {
			if (!filters.sortBy || !filters.sortDirection) {
				throw new HttpException('sortBy and sortDirection must be specified together', HttpStatus.BAD_REQUEST);
			}
		}

		if (filters.page || filters.pageSize) {
			if (!filters.page || !filters.pageSize) {
				throw new HttpException('page and pageSize must be specified together', HttpStatus.BAD_REQUEST);
			}

			if (filters.page < 0) {
				throw new HttpException('page must be greater than 0', HttpStatus.BAD_REQUEST);
			}

			if (filters.pageSize < 0) {
				throw new HttpException('page must be greater than 0', HttpStatus.BAD_REQUEST);
			}
		}

		return await this.productService.get(filters);
	}

	@Get('/:id')
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async getOne(@Param() params: { id: string }): Promise<Product> {
		const product = await this.productService.getOne(params.id);
		if (product == null) {
			throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
		}

		return product;
	}

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

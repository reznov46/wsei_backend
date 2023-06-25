import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, UserLevelComparable } from 'common';

@Controller('products')
export class ProductsController {
	@Get()
	@UseGuards(AuthGuard(UserLevelComparable.user))
	async getProducts(): Promise<null> {
		return null;
	}
}

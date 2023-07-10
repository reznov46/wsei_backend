import { EnvInterface } from '../modules/config/interfaces/env.interface';
import { GetEnv } from '../modules/config/getEnv.decorator';
import { Product } from '../models/product';
import { Logger } from '../logger/logger';
import { AdminTokenProvider } from '../modules/auth/adminTokenProvider';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export class ProductsRepository {
	constructor(
		@GetEnv private readonly env: EnvInterface,
		private readonly adminTokenProvider: AdminTokenProvider,
		private readonly httpService: HttpService,
	) {}

	private readonly logger = new Logger('ProductsRepository');

	async getProduct(id: string): Promise<Product | null> {
		const token = await this.adminTokenProvider.getAdminToken();
		if (token == null) {
			return null;
		}

		try {
			const response = await lastValueFrom(
				this.httpService.get<Product>('products/' + id, {
					baseURL: this.env.isDebug ? 'http://localhost:3002' : 'http://athena:3002',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
			);

			return response.data;
		} catch (error) {
			this.logger.error(`getProduct, error: ${error}`);

			return null;
		}
	}
}

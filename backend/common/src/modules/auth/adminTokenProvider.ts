import { HttpService } from '@nestjs/axios';
import { GetEnv } from '../config/getEnv.decorator';
import { EnvInterface } from '../config/interfaces/env.interface';
import { lastValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

export class AdminTokenProvider {
	constructor(@GetEnv private readonly env: EnvInterface, private readonly httpService: HttpService) {}

	private readonly logger = new Logger('AdminTokenProvider');

	async getAdminToken(): Promise<string | null> {
		try {
			const response = await lastValueFrom(
				this.httpService.post<{ token: string }>(
					'login',
					{
						username: this.env.adminUsername,
						password: this.env.adminPassword,
					},
					{
						baseURL: this.env.isDebug ? 'http://localhost:3001' : 'http://cerber:3001',
					},
				),
			);

			return response.data.token;
		} catch (e) {
			this.logger.error(`getAdminToken, error: ${e}`);

			return null;
		}
	}
}

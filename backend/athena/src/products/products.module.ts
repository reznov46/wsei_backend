import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CommonAuthModule } from 'common';

@Module({
	imports: [CommonAuthModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}

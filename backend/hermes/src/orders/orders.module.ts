import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonAuthModule, Order, ProductsRepository } from 'common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [TypeOrmModule.forFeature([Order]), CommonAuthModule],
	controllers: [OrdersController],
	providers: [OrdersService, ProductsRepository],
})
export class OrdersModule {}

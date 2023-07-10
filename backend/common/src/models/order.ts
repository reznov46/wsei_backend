import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	public id?: string;

	@Column({ type: 'uuid', name: 'product_id' })
	public productId: string;

	@Column({ name: 'quantity', type: 'smallint', unsigned: true })
	public quantity: number;

	@Column({ name: 'total_price', type: 'decimal', precision: 18, scale: 2, unsigned: true })
	public totalPrice: number;

	@Column({ name: 'bought_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly boughtAt: Date;

	@Column({ name: 'bought_by', type: 'uuid' })
	public readonly boughtBy: string;
}

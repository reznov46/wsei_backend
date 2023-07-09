import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity({ name: 'productCategories' })
export class ProductCategory {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	public id?: string;
	
	@Column({ name: 'name', length: 64 })
	public name: string;
	
	@Column({ name: 'description', length: 256, nullable: true })
	public description?: string;

	@Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly createdAt: Date;

	@Column({ name: 'created_by', type: 'uuid' })
	public readonly createdBy: string;
	
	@Column({ name: 'is_deleted', type: 'boolean', default: () => '0' })
	public isDeleted?: boolean;

	@OneToMany(() => Product, (product) => product.productCategory)
	@JoinColumn({name: "product_category_id"})
	products?: Product[]
}

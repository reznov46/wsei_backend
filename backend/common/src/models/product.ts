import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { ProductCategory } from './productCategory';

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	public id?: string;

	//* Name of the product, max 64 characters.
	@Column({ name: 'name', length: 64 })
	public name: string;

	//* Short description of the product, max 256 characters.
	@Column({ name: 'description', length: 256, nullable: true })
	public description?: string;

	@Column({ name: 'full_description', nullable: true })
	public fullDescription?: string;

	//* Price of the product, stores only 2 decimal places and max 18 digits total.
	@Column({ name: 'price', type: 'decimal', precision: 18, scale: 2 })
	public price: number;

	@ManyToOne(() => ProductCategory, (productCategory: ProductCategory) => productCategory.products)
	@JoinColumn({name: "product_category_id"})
	public productCategory: ProductCategory;

	@Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly createdAt: Date;

	@Column({ name: 'created_by', type: 'uuid' })
	public readonly createdBy: string;

	@Column({ name: 'is_deleted', type: 'boolean', default: () => '0' })
	public isDeleted?: boolean;
}

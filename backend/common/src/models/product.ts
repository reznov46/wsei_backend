import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
	constructor() {}

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
	public price?: number;

	@Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly createdAt: Date;

	@Column({ name: 'created_by', type: 'uuid' })
	public readonly createdBy: string;
	@Column({ name: 'updated_at', nullable: true })
	public updatedAt?: Date;

	@Column({ name: 'updated_by', type: 'uuid', nullable: true })
	public updatedBy?: string;
	@Column({ name: 'is_deleted', type: 'boolean', default: () => '0' })
	public isDeleted?: boolean;
}

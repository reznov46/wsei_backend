import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserLevel {
	user = 'user',
	admin = 'admin',
}

export enum UserLevelComparable {
	user = 1,
	admin = 2,
}

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ unique: true, type: 'varchar', length: 64 })
	public username: string;

	@Column({ type: 'varchar', length: 60 })
	public password: string;

	@Column({ length: 16 })
	public level: UserLevel;

	@Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly createdAt: Date;

	@Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	public readonly updatedAt: Date;

	public get levelComparable(): UserLevelComparable {
		switch (this.level) {
			case UserLevel.user:
				return UserLevelComparable.user;

			case UserLevel.admin:
				return UserLevelComparable.admin;
		}
	}
}

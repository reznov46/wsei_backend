import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserLevel {
	user = 'user',
	admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	public id: string;

	@Column({ name: 'username', unique: true, type: 'varchar', length: 64 })
	public username: string;

	@Column({ name: 'password', type: 'char', length: 60 })
	public password: string;

	@Column({ name: 'level', length: 16 })
	public level: UserLevel;

	@Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	public readonly createdAt: Date;

	@Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	public readonly updatedAt: Date;
}

export enum UserLevelComparable {
	user = 1,
	admin = 2,
}

export namespace UserLevelComparable {
	export function fromUserLevel(level: UserLevel): UserLevelComparable {
		switch (level) {
			case UserLevel.user:
				return UserLevelComparable.user;

			case UserLevel.admin:
				return UserLevelComparable.admin;
		}
	}
}

import { DataTypes, Model, Sequelize } from 'sequelize';

enum UserLevel {
	user = 'user',
	admin = 'admin',
}

enum UserLevelComparable {
	user = 1,
	admin = 2,
}

class User extends Model {
	public id!: string;
	public username!: string;
	public password!: string;
	public level!: UserLevel;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public get levelComparable(): UserLevelComparable {
		switch (this.level) {
			case UserLevel.user:
				return UserLevelComparable.user;

			case UserLevel.admin:
				return UserLevelComparable.admin;
		}
	}

	static register(sequelize: Sequelize): void {
		User.init(
			{
				id: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false,
				},
				username: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				level: {
					type: DataTypes.ENUM,
					values: Object.values(UserLevel),
					defaultValue: UserLevel.user,
					allowNull: false,
				},
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'User',
				tableName: 'users',
				underscored: true,
				indexes: [
					{
						unique: true,
						fields: ['username'],
					},
				],
			},
		);
	}
}

export default User;
export { UserLevel, UserLevelComparable };

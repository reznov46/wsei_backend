import { Logger } from 'common';
import User from '../../models/user';

class UsersService {
	private readonly logger = new Logger('UsersService');

	public async getUsers(): Promise<User[] | null> {
		const users = await User.findAll({
			attributes: {
				exclude: ['password'],
			},
		});

		if (!users) {
			this.logger.error('Cannot query users!');

			return null;
		}

		return users;
	}

	public async getUserById(id: string): Promise<User | null> {
		const user = await User.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['password'],
			},
		});

		if (!user) {
			this.logger.error('getUserById, cannot query user!');

			return null;
		}

		return user;
	}
}

export default UsersService;

import { Logger } from 'common';
import User from '../../models/user';
import { GetUsersError, GetUsersResult } from './results/get_users_result';
import { GetUserError, GetUserResult } from './results/get_user_result';

class UsersService {
	private readonly logger = new Logger('UsersService');

	public async getUsers(): Promise<GetUsersResult> {
		const users = await User.findAll({
			attributes: {
				exclude: ['password'],
			},
		});

		if (!users) {
			this.logger.error('Cannot query users!');
			return GetUsersResult.withError(GetUsersError.cannotFetchUsers);
		}

		return GetUsersResult.withResult(users);
	}

	public async getUserById(id: string): Promise<GetUserResult> {
		const user = await User.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['password'],
			},
		});

		if (!user) {
			this.logger.error('Cannot query user!');

			return GetUserResult.withError(GetUserError.cannotFetchUser);
		}

		return GetUsersResult.withResult(user);
	}
}

export default UsersService;

import { Logger } from 'common';
import User from '../../models/user';
import { GetUsersError, GetUsersResult } from './results/get_users_result';

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
}

export default UsersService;

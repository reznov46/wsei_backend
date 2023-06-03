import { ControllerResult } from 'common';
import User from '../../../models/user';

enum GetUsersError {
	cannotFetchUsers,
}

class GetUsersResult extends ControllerResult<GetUsersError, User[]> {}

export { GetUsersError, GetUsersResult };

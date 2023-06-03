import { ControllerResult } from 'common';
import User from '../../../models/user';

enum GetUserError {
	cannotFetchUser,
}

class GetUserResult extends ControllerResult<GetUserError, User> {}

export { GetUserError, GetUserResult };

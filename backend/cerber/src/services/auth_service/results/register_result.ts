import { ControllerResult } from 'common';
import User from '../../../models/user';

enum RegisterError {
	cannotFetchUsers,
	usernameTaken,
	emailTaken,
	cannotCreateUser,
}

class RegisterResult extends ControllerResult<RegisterError, User> {}

export { RegisterResult, RegisterError };

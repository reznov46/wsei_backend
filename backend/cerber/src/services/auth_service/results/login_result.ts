import { ControllerResult } from 'common';

enum LoginError {
	cannotFetchUsers,
	credentialsInvalid,
	cannotGenerateToken,
}

class LoginResult extends ControllerResult<LoginError, string> {}

export { LoginResult, LoginError };

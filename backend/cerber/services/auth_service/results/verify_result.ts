import { ControllerResult } from '../../../../common/common';
import User from '../../../models/user';

enum VerifyError {
	tokenInvalid,
	cannotFetchUsers,
}

class VerifyResult extends ControllerResult<VerifyError, User> {}

export { VerifyResult, VerifyError };
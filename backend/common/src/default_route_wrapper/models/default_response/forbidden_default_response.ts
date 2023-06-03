import DefaultResponse from './default_response';

class ForbiddenDefaultResponse implements DefaultResponse {
	constructor(public readonly message = 'Forbidden') {}

	public readonly status = 403;
}

export default ForbiddenDefaultResponse;

import DefaultResponse from './default_response';

class NotFoundDefaultResponse implements DefaultResponse {
	constructor(public readonly message = 'Not Found') {}

	public readonly status = 404;
}

export default NotFoundDefaultResponse;

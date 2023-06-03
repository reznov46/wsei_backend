import DefaultResponse from './default_response';

class BadRequestDefaultResponse implements DefaultResponse {
	constructor(public readonly message = 'Bad Request') {}

	public readonly status = 400;
}

export default BadRequestDefaultResponse;

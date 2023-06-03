import DefaultResponse from './default_response';

class NoContentDefaultResponse implements DefaultResponse {
	constructor(public readonly message = '') {}

	public readonly status = 201;
}

export default NoContentDefaultResponse;

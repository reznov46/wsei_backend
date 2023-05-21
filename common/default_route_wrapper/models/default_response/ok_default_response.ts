import DefaultResponse from './default_response';

class OkDefaultResponse implements DefaultResponse {
	constructor(public readonly message: object) {}

	public readonly status = 200;
}

export default OkDefaultResponse;

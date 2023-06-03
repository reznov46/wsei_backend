import DefaultResponse from './default_response';

class InternalErrorDefaultResponse implements DefaultResponse {
	constructor(public readonly message = 'Internal Error') {}

	public readonly status = 500;
}

export default InternalErrorDefaultResponse;

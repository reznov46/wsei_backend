class ControllerResult<Error, Result> {
	constructor(public readonly error: Error, public readonly result: Result) {}

	static withError<Error, Result>(error: Error): ControllerResult<Error, Result> {
		return new ControllerResult<Error, Result>(error, null);
	}

	static withResult<Error, Result>(result: Result): ControllerResult<Error, Result> {
		return new ControllerResult<Error, Result>(null, result);
	}
}

export { ControllerResult };

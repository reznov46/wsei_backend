class LoggerService {
	private static instance: LoggerService | null;

	private constructor() {}

	static getInstance() {
		return LoggerService.instance ?? new LoggerService();
	}

	log(message: string) {
		console.log(message);

		// TODO: Log to file
	}
}

export default LoggerService;

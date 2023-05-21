import chalk from 'chalk';
import moment from 'moment';

import LoggerService from './service/logger_service';

class Logger {
	constructor(private tag: string) {
		this.loggerService = LoggerService.getInstance();
	}

	private loggerService: LoggerService;

	fatal(message: string) {
		const heading = this.getHeading();
		const log = chalk.bgRed.white.bold(`${heading} ${message}`);

		this.loggerService.log(log);
	}

	trace(message: string) {
		const error = new Error(message);
		const stack = error.stack;
		const log = chalk.white(stack);

		this.loggerService.log(log);
	}

	error(message: string) {
		const heading = this.getHeading();
		const log = chalk.red(`${heading} ${message}`);

		this.loggerService.log(log);
	}

	warning(message: string) {
		const heading = this.getHeading();
		const log = chalk.yellow(`${heading} ${message}`);

		this.loggerService.log(log);
	}

	info(message: string) {
		const heading = this.getHeading();
		const log = chalk.blue(`${heading} ${message}`);

		this.loggerService.log(log);
	}

	private getHeading() {
		const now = moment();
		const time = now.format('HH:mm:ss');
		const date = now.format('DD/MM/YYYY');

		return `${date} ${time} [${this.tag}]`;
	}
}

export default Logger;

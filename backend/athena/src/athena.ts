import { Logger, MysqlDatabaseManager } from 'common';
import express from 'express';
import dotenv from 'dotenv';

require('source-map-support').install();

const logger = new Logger('main');
const init = async (): Promise<void> => {
	const databaseManager = new MysqlDatabaseManager({
		host: process.env.DATABASE_HOST!,
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASSWORD!,
		database: process.env.DATABASE_DB_NAME!,
	});

	const initSuccess = await databaseManager.init();
	if (!initSuccess) {
		logger.fatal('Cannot init database manager!');
		return;
	}

	const app = express();
	const port = process.env.PORT!;

	app.use(express.json());
	// app.use(CookieParser());

	app.listen(port, () => {
		logger.info(`Athena listening on port ${port}.`);
	});
};

dotenv.config();
init();

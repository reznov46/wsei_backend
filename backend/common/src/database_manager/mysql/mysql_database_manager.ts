import { Sequelize } from 'sequelize';
import Logger from '../../logger/logger';
import delay from '../../utils/delay';
import DatabaseManager from '../interface/database_manager';
import DatabaseCredentials from './models/database_credentials';

class MysqlDatabaseManager implements DatabaseManager {
	constructor(credentials: DatabaseCredentials) {
		this.credentials = credentials;

		this.onConnectionError = this.onConnectionError.bind(this);
	}

	private readonly logger: Logger = new Logger('MysqlDatabaseManager');

	private readonly credentials: DatabaseCredentials;
	private connection: Sequelize | undefined;

	async init(): Promise<boolean> {
		const connection = await this.createConnection(this.credentials);
		if (!connection) {
			this.logger.fatal('create, cannot create connection!');

			return false;
		}

		let tries = 0;
		while (!(await this.connect(connection))) {
			this.logger.warning('init, cannot connect, retrying in 5s!');
			await delay(5000);

			if (tries++ > 10) {
				this.logger.error('init, more that 10 retries failed!');
				return false;
			}
		}

		this.connection = connection;
		this.logger.info('init, connected.');

		return true;
	}

	async close(): Promise<boolean> {
		if (!this.connection) {
			this.logger.error('close, connection is not opened!');
			return false;
		}

		try {
			await this.connection.close();
			this.connection = undefined;

			return true;
		} catch (e) {
			this.logger.error('close, cannot close connection!');
			this.logger.trace(e);

			return false;
		}
	}

	async sync(): Promise<boolean> {
		if (this.connection === undefined) {
			this.logger.error('sync, connection is not opened!');
			return false;
		}

		try {
			await this.connection.sync();

			return true;
		} catch (error) {
			this.logger.error('sync, cannot sync!');
			this.logger.trace(error);

			return false;
		}
	}

	// async query(query: string, values: string[]): Promise<Object[] | null> {
	// 	if (!this.isReady) {
	// 		this.logger.error('query, manager is not ready!');
	// 		return null;
	// 	}

	// 	try {
	// 		const result = await this.connection.query(query, values);
	// 		if (!result) {
	// 			return null;
	// 		}

	// 		const results = result[0];
	// 		if (!results) {
	// 			return null;
	// 		}

	// 		return results as Object[];
	// 	} catch (e) {
	// 		this.logger.error('query, cannot query!');
	// 		this.logger.trace(e);

	// 		return null;
	// 	}
	// }

	// async beginTransaction(): Promise<boolean> {
	// 	if (!this.isReady) {
	// 		this.logger.error('beginTransaction, manager is not ready!');
	// 		return false;
	// 	}

	// 	try {
	// 		await this.connection.beginTransaction();

	// 		return true;
	// 	} catch (e) {
	// 		this.logger.error('beginTransaction, cannot begin transaction!');
	// 		this.logger.trace(e);

	// 		return false;
	// 	}
	// }

	// async commit(): Promise<boolean> {
	// 	if (!this.isReady) {
	// 		this.logger.error('commit, manager is not ready!');
	// 		return false;
	// 	}

	// 	try {
	// 		await this.connection.commit();

	// 		return true;
	// 	} catch (e) {
	// 		this.logger.error('commit, cannot begin transaction!');
	// 		this.logger.trace(e);

	// 		return false;
	// 	}
	// }

	// async rollback(): Promise<boolean> {
	// 	if (!this.isReady) {
	// 		this.logger.error('rollback, manager is not ready!');
	// 		return false;
	// 	}

	// 	try {
	// 		await this.connection.rollback();

	// 		return true;
	// 	} catch (e) {
	// 		this.logger.error('rollback, cannot begin transaction!');
	// 		this.logger.trace(e);

	// 		return false;
	// 	}
	// }

	get isReady(): boolean {
		if (!this.connection) {
			this.logger.error('isReady, connection is not created!');
			return false;
		}

		return true;
	}

	get sequelize(): Sequelize | undefined {
		return this.connection;
	}

	// region Handlers

	private async onConnectionError(error: any) {
		this.logger.error(`onConnectionError, connection error (${error})!`);

		this.logger.info('onConnectionError, closing current connection.');
		const closeSuccess = await this.close();
		if (!closeSuccess) {
			this.logger.fatal('onConnectionError, cannot close current connection!');
			return;
		}

		this.logger.info('onConnectionError, creating new connection connection in 1s...');
		await delay(1000);

		const initSuccess = await this.init();
		if (!initSuccess) {
			this.logger.fatal('onConnectionError, cannot create new connection!');
			return;
		}
	}

	// endregion

	// region Wrappers

	private async connect(connection: Sequelize): Promise<boolean> {
		try {
			await connection.authenticate();
			this.logger.info('connect, connected to db.');

			return true;
		} catch (e) {
			this.logger.error('connect, cannot connect to db!');
			this.logger.trace(e);

			return false;
		}
	}

	private async createConnection(credentials: DatabaseCredentials): Promise<Sequelize | undefined> {
		try {
			return new Sequelize(credentials.database, credentials.user, credentials.password, {
				host: credentials.host,
				dialect: 'mysql',
			});
		} catch (e) {
			this.logger.error('createConnection, cannot create connection!');
			this.logger.trace(e);

			return undefined;
		}
	}

	// endregion
}

export default MysqlDatabaseManager;

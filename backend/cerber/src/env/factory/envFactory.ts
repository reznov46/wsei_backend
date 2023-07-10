import { Dictionary, Logger } from 'common';
import { Env } from '../model/env';

export class EnvFactory {
	private readonly logger = new Logger('EnvFactory');

	build(env: Dictionary<string>): Env | null {
		const port = env['PORT'];
		if (port == null) {
			this.logger.error('build, port is null!');
			return null;
		}

		const portParsed = parseInt(port);
		if (isNaN(portParsed)) {
			this.logger.error('build, port is not a number!');
			return null;
		}

		const adminUsername = env['ADMIN_USERNAME'];
		if (adminUsername == null) {
			this.logger.error('build, admin username is null!');
			return null;
		}

		const adminPassword = env['ADMIN_PASSWORD'];
		if (adminPassword == null) {
			this.logger.error('build, admin password is null!');
			return null;
		}

		const databaseHost = env['DATABASE_HOST'];
		if (databaseHost == null) {
			this.logger.error('build, database host is null!');
			return null;
		}

		const databasePort = env['DATABASE_PORT'];
		if (databasePort == null) {
			this.logger.error('build, database port is null!');
			return null;
		}

		const databasePortParsed = parseInt(databasePort);
		if (isNaN(databasePortParsed)) {
			this.logger.error('build, database port is not a number!');
			return null;
		}

		const databaseDbName = env['DATABASE_DB_NAME'];
		if (databaseDbName == null) {
			this.logger.error('build, database db name is null!');
			return null;
		}

		const databaseUser = env['DATABASE_USER'];
		if (databaseUser == null) {
			this.logger.error('build, database user is null!');
			return null;
		}

		const databasePassword = env['DATABASE_PASSWORD'];
		if (databasePassword == null) {
			this.logger.error('build, database password is null!');
			return null;
		}

		const jwtSecret = env['JWT_SECRET'];
		if (jwtSecret == null) {
			this.logger.error('build, jwt secret is null!');
			return null;
		}

		const jwtExpirationTime = env['JWT_EXPIRATION_TIME'];
		if (jwtExpirationTime == null) {
			this.logger.error('build, jwt expiration time is null!');
			return null;
		}

		const jwtExpirationTimeParsed = parseInt(jwtExpirationTime);
		if (isNaN(jwtExpirationTimeParsed)) {
			this.logger.error('build, jwt expiration time is not a number!');
			return null;
		}
		const allowedCorsAddressesString = env['ALLOWED_CORS_ADDRESSES'];
		if (allowedCorsAddressesString == null) {
			this.logger.error('build, allowed cors string is null');
			return null;
		}
		const allowedCorsAddresses = allowedCorsAddressesString.split(', ');
		if (allowedCorsAddresses == null) {
			this.logger.error('build, allowed cors address are null');
			return null;
		}

		return Object.freeze({
			isDebug: process.env.DOCKER ? false : true,
			adminUsername,
			adminPassword,
			port: portParsed,
			databaseHost,
			databasePort: databasePortParsed,
			databaseDbName,
			databaseUser,
			databasePassword,
			jwtSecret,
			jwtExpirationTime: jwtExpirationTimeParsed,
			allowedCorsAddresses,
		});
	}
}

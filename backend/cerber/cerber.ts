import express from 'express';
import CookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import User from './models/user';
import AuthController from './controllers/auth_controller/auth_controller';
import AuthService from './services/auth_service/auth_service';
import JwtTokenProvider from './token_provider/jwt/jwt_token_provider';
import UsersService from './services/users_service/users_service';
import UsersController from './controllers/users/users_controller';
import { Logger, MysqlDatabaseManager } from '../common/common';

// eslint-disable-next-line import/no-extraneous-dependencies
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

	User.register(databaseManager.sequelize);
	await databaseManager.sync();

	const tokenProvider = new JwtTokenProvider();
	const jwtInitSuccess = await tokenProvider.init();
	if (!jwtInitSuccess) {
		logger.fatal('Cannot init JWT token provider!');
		return;
	}

	const app = express();
	const port = process.env.PORT!;

	app.use(express.json());
	app.use(CookieParser());
	app.use(tokenProvider.middleware());

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "*")
		next();
	});

	const authService = new AuthService(tokenProvider);
	const authController = new AuthController(authService);
	authController.register(app);

	const usersService = new UsersService();
	const usersController = new UsersController(authService, usersService);
	usersController.register(app);

	app.listen(port, () => {
		logger.info(`Cerber listening on port ${port}.`);
	});
};

dotenv.config();
init();

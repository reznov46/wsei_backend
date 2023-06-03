import {
	defaultRouteWrapper,
	ForbiddenDefaultResponse,
	OkDefaultResponse,
	DefaultResponse,
	Logger,
	InternalErrorDefaultResponse,
	NotFoundDefaultResponse,
} from 'common';
import { Express, Request } from 'express';
import { UserLevelComparable } from '../../models/user';
import AuthService from '../../services/auth_service/auth_service';
import UsersService from '../../services/users_service/users_service';

class UsersController {
	constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {
		this.handleGetUsers = this.handleGetUsers.bind(this);
	}

	private readonly logger = new Logger('UsersController');

	public register(app: Express): void {
		app.get('/users', defaultRouteWrapper(this.handleGetUsers.bind(this)));
		app.get('/users/:id', defaultRouteWrapper(this.handleGetUser.bind(this)));

		this.logger.info('Registered.');
	}

	private async handleGetUsers(req: Request): Promise<DefaultResponse> {
		const tokenResult = await this.authService.verifyTokenPayload(req.tokenPayload);
		if (tokenResult.error != null) {
			return new ForbiddenDefaultResponse('Token is invalid!');
		}

		const user = tokenResult.result;
		if (user == null) {
			this.logger.error('handleGetUsers, user is null!');
			return new InternalErrorDefaultResponse();
		}

		if (user.levelComparable < UserLevelComparable.admin) {
			this.logger.warning('handleGetUsers, user is not admin!');
			return new ForbiddenDefaultResponse('You are not allowed to do this!');
		}

		const usersResult = await this.usersService.getUsers();
		if (usersResult.error != null) {
			this.logger.error('handleGetUsers, cannot fetch users!');
			return new InternalErrorDefaultResponse('Cannot fetch users!');
		}

		const users = usersResult.result;
		if (users == null) {
			this.logger.error('handleGetUsers, users is null!');
			return new InternalErrorDefaultResponse();
		}

		return new OkDefaultResponse({ users });
	}

	private async handleGetUser(req: Request): Promise<DefaultResponse> {
		const tokenResult = await this.authService.verifyTokenPayload(req.tokenPayload);
		if (tokenResult.error != null) {
			return new ForbiddenDefaultResponse('Token is invalid!');
		}

		const user = tokenResult.result;
		if (user == null) {
			this.logger.error('handleGetUser, user is null!');
			return new InternalErrorDefaultResponse();
		}

		const userId = req.params.id;
		if (userId == null) {
			this.logger.error('handleGetUser, userId is null!');
			return new InternalErrorDefaultResponse();
		}

		if (user.id != userId && user.levelComparable < UserLevelComparable.admin) {
			this.logger.warning('handleGetUser, user is not admin!');
			return new ForbiddenDefaultResponse('You are not allowed to do this!');
		}

		const userResult = await this.usersService.getUserById(userId);
		if (userResult.error != null) {
			this.logger.error('handleGetUser, cannot fetch user!');
			return new NotFoundDefaultResponse('Cannot find user!');
		}

		const result = userResult.result;
		if (result == null) {
			this.logger.error('handleGetUser, user is null!');
			return new InternalErrorDefaultResponse();
		}

		return new OkDefaultResponse(user);
	}
}

export default UsersController;

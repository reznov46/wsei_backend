import {
	defaultRouteWrapper,
	ForbiddenDefaultResponse,
	OkDefaultResponse,
	DefaultResponse,
	Logger,
	InternalErrorDefaultResponse,
	NotFoundDefaultResponse,
	BadRequestDefaultResponse,
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
		app.get('/userByToken', defaultRouteWrapper(this.handleGetUserByToken.bind(this)));

		this.logger.info('Registered.');
	}

	private async handleGetUsers(req: Request): Promise<DefaultResponse> {
		const { tokenPayload } = req;
		if (tokenPayload == null) {
			return new ForbiddenDefaultResponse();
		}

		const user = await this.usersService.getUserById(tokenPayload.id);
		if (user == null) {
			return new ForbiddenDefaultResponse();
		}

		if (user.levelComparable < UserLevelComparable.admin) {
			this.logger.warning('handleGetUsers, user is not admin!');

			return new ForbiddenDefaultResponse('You are not allowed to do this!');
		}

		const users = await this.usersService.getUsers();
		if (users == null) {
			this.logger.error('handleGetUsers, cannot fetch users!');

			return new InternalErrorDefaultResponse('Cannot fetch users!');
		}

		return new OkDefaultResponse({ users });
	}

	private async handleGetUser(req: Request): Promise<DefaultResponse> {
		const { tokenPayload } = req;
		if (tokenPayload == null) {
			return new ForbiddenDefaultResponse();
		}

		const user = await this.usersService.getUserById(tokenPayload.id);
		if (user == null) {
			return new ForbiddenDefaultResponse();
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

		const fetchedUser = await this.usersService.getUserById(userId);
		if (fetchedUser == null) {
			this.logger.error('handleGetUser, cannot fetch user!');

			return new NotFoundDefaultResponse('Cannot find user!');
		}

		return new OkDefaultResponse(fetchedUser);
	}

	private async handleGetUserByToken(req: Request): Promise<DefaultResponse> {
		const { token } = req.query;
		if (token == null) {
			return new BadRequestDefaultResponse();
		}

		if (typeof token !== 'string') {
			return new BadRequestDefaultResponse();
		}

		const tokenPayload = await this.authService.verify(token);
		if (tokenPayload == null) {
			return new ForbiddenDefaultResponse();
		}

		const user = await this.usersService.getUserById(tokenPayload.id);
		if (user == null) {
			return new ForbiddenDefaultResponse();
		}

		return new OkDefaultResponse(user);
	}
}

export default UsersController;

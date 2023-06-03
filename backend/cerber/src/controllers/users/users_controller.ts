import {
	defaultRouteWrapper,
	ForbiddenDefaultResponse,
	OkDefaultResponse,
	DefaultResponse,
	Logger,
	InternalErrorDefaultResponse,
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
		app.get('/users', defaultRouteWrapper(this.handleGetUsers));

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
}

export default UsersController;

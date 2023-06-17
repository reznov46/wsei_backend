import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './users.service';
import { Token, User, UserLevelComparable } from 'common';
import { TokenToUserPipe } from 'src/pipes/tokenToUser.pipe';
import { UserRemovePasswordInterceptor } from 'src/interceptors/userRemovePassword.interceptor';
import { UsersRemovePasswordInterceptor } from 'src/interceptors/usersRemovePassword.interceptor';

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('users')
	@UseGuards(AuthGuard(UserLevelComparable.admin))
	@UseInterceptors(UsersRemovePasswordInterceptor)
	async getUsers(): Promise<User[]> {
		const users = await this.usersService.getUsers();
		if (users == null) {
			throw new HttpException('Cannot fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return users;
	}

	@Get('users/:id')
	@UseGuards(AuthGuard(UserLevelComparable.user))
	@UseInterceptors(UserRemovePasswordInterceptor)
	async getUser(
		@Token(TokenToUserPipe) requestUser: User,
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<User> {
		if (requestUser.id != id && requestUser.levelComparable < UserLevelComparable.admin) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}

		const user = await this.usersService.getUserById(id);
		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return user;
	}

	@Get('user-by-token')
	@UseInterceptors(UserRemovePasswordInterceptor)
	async getUserByToken(@Query('token', TokenToUserPipe) user: User): Promise<User> {
		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return user;
	}
}

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import User from 'src/entities/user';

@Injectable()
export class UsersRemovePasswordInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<User[]> {
		return next.handle().pipe(
			map((users: User[]) => {
				for (const user of users) {
					delete user.password;
				}

				return users;
			}),
		);
	}
}

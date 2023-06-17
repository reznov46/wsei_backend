import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from 'common';

@Injectable()
export class UsersRemovePasswordInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Partial<User>[]> {
		return next.handle().pipe(
			map((users: User[]) => {
				const usersCopy: Partial<User>[] = [];

				for (const user of users) {
					const userCopy: Partial<User> = { ...user };
					delete userCopy.password;

					usersCopy.push(userCopy);
				}

				return usersCopy;
			}),
		);
	}
}

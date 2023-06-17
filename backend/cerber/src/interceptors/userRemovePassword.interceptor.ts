import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from 'common';

@Injectable()
export class UserRemovePasswordInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Partial<User>> {
		return next.handle().pipe(
			map((user: User) => {
				const userCopy: Partial<User> = { ...user };
				delete userCopy.password;

				return userCopy;
			}),
		);
	}
}

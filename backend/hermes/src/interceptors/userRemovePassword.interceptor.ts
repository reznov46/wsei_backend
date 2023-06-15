import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import User from 'src/entities/user';

@Injectable()
export class UserRemovePasswordInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<User> {
		return next.handle().pipe(
			map((user: User) => {
				delete user.password;

				return user;
			}),
		);
	}
}

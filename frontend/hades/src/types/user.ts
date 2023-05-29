export interface User {
	username: string;
	password: string;
}

export enum UserLevel {
	user = 'user',
	admin = 'admin',
}

export interface UserDetails {
	id: string;
	username: string;
	level: UserLevel | '';
	createdAt: string;
}

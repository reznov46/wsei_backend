import { UserLevel } from '../types/user';

export const isAdmin = (level: UserLevel) => {
	return level === UserLevel.admin;
};

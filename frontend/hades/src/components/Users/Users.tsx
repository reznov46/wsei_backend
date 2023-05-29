import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { endpoints } from '../../routes/routes';
import { ErrorResponse, UsersResponse } from '../../types/responses';
import { UserDetails } from '../../types/user';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { isAdmin } from '../../utils/functions';

export const Users: React.FC = () => {
	const [users, setUsers] = useState<UserDetails[]>([]);
	const history = useHistory();

	const {
		data: { level },
	} = useGetCurrentUserDetails();

	useEffect(() => {
		if (level) {
			isAdmin(level)
				? axios
						.get(endpoints.users, {
							withCredentials: true,
						})
						.then((response: UsersResponse) => {
							const { users } = response.data;
							setUsers(users);
						})
						.catch((error: ErrorResponse) => {
							console.error(error.response.data);
						})
				: history.push('/');
		}
	}, [level]);

	return (
		<>
			{users ? (
				<div>
					<h2>users:</h2>
					{users.map((user) => (
						<div key={user.id}>
							<p>username: {user.username}</p>
							<p>level: {user.level}</p>
							<p>id: {user.id}</p>
							<p>
								createdAt:{' '}
								{new Date(user.createdAt).toLocaleDateString(
									'pl-PL',
								)}
							</p>
							<p>-----------------</p>
						</div>
					))}
				</div>
			) : (
				<CircularProgress />
			)}
		</>
	);
};

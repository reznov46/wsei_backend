import React from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import { routeBuilder } from '../../routes/routes';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { Loader } from '../Loader/Loader';

export const Users: React.FC = () => {
  const { data, loading, error } = useGetUsers();

  if (loading) {
    return <Loader />;
  };

  if (error) {
    return (
      <ErrorComponent
        text={error}
        link={routeBuilder.home}
      />
    )
  };

  return (
    <>
      <div>
        <h2>users:</h2>
        {data.map((user) => (
          <div key={user.id}>
            <p>username: {user.username}</p>
            <p>level: {user.level}</p>
            <p>id: {user.id}</p>
            <p>
              createdAt:{' '}
              {new Date(user.createdAt).toLocaleDateString('pl-PL')}
            </p>
            <p>-----------------</p>
          </div>
        ))}
      </div>
    </>
  );
};

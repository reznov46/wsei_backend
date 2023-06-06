import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeBuilder } from './routes/routes';
import { LoginForm } from './components/Login/LoginForm';
import { RegisterForm } from './components/Register/RegisterForm';
import { UserDetails } from './components/UserDetails/UserDetails';
import { UsersList } from './components/UsersList/UsersList';
import { appStyles } from './styles/app';

export const AppNavigator: React.FC = () => (
  <div style={appStyles.navigator}>
    <Switch>
      <Route path={routeBuilder.home} children={'initial'} exact />
      <Route path={routeBuilder.login} component={LoginForm} exact />
      <Route path={routeBuilder.register} component={RegisterForm} exact />
      <Route path={routeBuilder.details} component={UserDetails} exact />
      <Route path={routeBuilder.users} component={UsersList} exact />
      <Route path={routeBuilder.userId} children={'id'} exact />
      <Route path={routeBuilder.noPage} children={'noPage'} />
    </Switch>
  </div>
);
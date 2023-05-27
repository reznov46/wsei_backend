import React from 'react';
import { routeBuilder } from './routes/routes';
import { LoginForm } from './components/Login/LoginForm';
import { RegisterForm } from './components/Register/RegisterForm';
import { Route, Switch } from 'react-router-dom'
import { UserDetails } from './components/UserDetails/UserDetails';

export const AppNavigator: React.FC = () => (
  <Switch>
    <Route
      path={routeBuilder.home}
      children={'initial'}
      exact
    />
    <Route
      path={routeBuilder.login}
      component={LoginForm}
      exact
    />
    <Route
      path={routeBuilder.register}
      component={RegisterForm}
      exact
    />
    <Route
      path={'/details'}
      component={UserDetails}
      exact
    />
    <Route
      path={routeBuilder.noPage}
      children={'no page'}
    />
  </Switch>
);

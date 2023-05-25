import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { routeBuilder } from './routes/routes';
import { LoginForm } from './components/Login/LoginForm';
import { RegisterForm } from './components/Register/RegisterForm';

export const AppNavigator: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routeBuilder.defaultPath}
        element={'initial'}
      />
      <Route
        path={routeBuilder.login}
        element={<LoginForm />}
      />
      <Route
        path={routeBuilder.register}
        element={<RegisterForm />}
      />
      <Route
        path={routeBuilder.noPage}
        element={'no page'}
      />
    </Routes>
  </BrowserRouter>
);

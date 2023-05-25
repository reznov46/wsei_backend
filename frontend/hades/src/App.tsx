import React from 'react';
import { LoginForm } from './components/Login/LoginForm';
import { RegisterForm } from './components/Register/RegisterForm';

export const App: React.FC = () => {
  return (
    <>
      <LoginForm />
      <RegisterForm />
    </>
  );
}

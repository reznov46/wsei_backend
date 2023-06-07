import React from 'react';
import { routeBuilder } from '../../routes/routes';
import { ErrorComponent } from './ErrorComponent';

export const NotFound: React.FC = () => (
  <ErrorComponent
    text='404 - Page not found'
    link={routeBuilder.home}
  />
);
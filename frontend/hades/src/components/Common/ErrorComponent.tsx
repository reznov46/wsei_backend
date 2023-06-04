import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { routeBuilder } from '../../routes/routes';

interface ErrorProps {
  text: string
  link?: string
}

export const ErrorComponent: React.FC<ErrorProps> = ({
  text,
  link
}) => {
  const redirectedPage = Object.entries(routeBuilder)
    .find(a => a[1] === link)?.[0];

  const buttonText = redirectedPage
    ? `Redirect to ${redirectedPage} page`
    : 'Redirect';

  return (
    <>
      {text}
      {link && (
        <Button>
          <Link to={link}>{buttonText}</Link>
        </Button>
      )}
    </>
  )
};
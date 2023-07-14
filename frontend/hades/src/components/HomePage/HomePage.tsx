import { Box, Typography } from '@mui/material';
import React from 'react';
import { homeStyles } from '../../styles/home';

export const HomePage: React.FC = () => {

  return (
    <Box sx={homeStyles.div}>
      <div>
        <Typography
          variant="h3"
        >
          Programowanie Aplikacji Backendowych
        </Typography>
        <Typography
          variant="h3"
          style={homeStyles.wseiText}
        >
          WSEI 2023
        </Typography>
        {authors.map((author) => (
          <Typography
            variant="h5"
            color="text.secondary"
            key={author}
            style={homeStyles.authors}
          >
            {author}
          </Typography>
        ))}
      </div>
    </Box >
  )
}

const authors = [
  'Sebastian Oraczek',
  'Przemysław Kędzierski',
  'Maciej Rawicz',
  'Mateusz Nowak'
]
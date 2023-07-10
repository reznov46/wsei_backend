import { Card, CardContent } from '@mui/material';
import React from 'react';
import { Category } from '../../types/category';

export const CategoryCard: React.FC<{ category: Category }> = ({
  category
}) => {

  return (
    <Card
      elevation={6}
    // style={usersListStyles.card}
    // onClick={() => history.push(userRoute)}
    >
      <CardContent>
        {/* <Description user={user} /> */}
        <p>{category.name}</p>
        <p>{category.description}</p>
      </CardContent>
    </Card>
  )
}
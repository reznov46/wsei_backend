import React from 'react';
import { useGetCategories } from '../../hooks/useGetCategories';
import { routeBuilder } from '../../routes/routes';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { CategoryCard } from './CategoryCard';

export const CategoriesList: React.FC = () => {
  const { data, loading, error } = useGetCategories();

  if (loading) {
    return <Loader />
  };

  if (error) {
    return (
      <ErrorComponent
        text={error}
        link={routeBuilder.login}
      />
    )
  };

  return (
    <>{data.map((category) => (
      <div key={category.id}>
        <CategoryCard category={category} />
      </div>
    ))}</>
  )
}
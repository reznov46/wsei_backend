import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategories } from '../../hooks/useGetCategories';
import { routeBuilder } from '../../routes/routes';
import { getCategoryIdParam, getPageNumParam, getPageSizeParam } from '../../utils/defaultParams';
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

  const getLinkFilteredByCategory = (categoryId: string): string => {
    return `${routeBuilder.products}?${getCategoryIdParam(categoryId)}&${getPageNumParam()}&${getPageSizeParam()}`;
  }

  return (
    <>
      {data.map((category) => (
        <Link key={category.id} to={getLinkFilteredByCategory(category.id)}>
          <CategoryCard category={category} />
        </Link>
      ))}
    </>
  )
}
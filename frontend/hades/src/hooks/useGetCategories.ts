import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { Category } from '../types/category';
import { FetchedData } from '../types/fetchedData';
import { ErrorResponse, ProductResponse } from '../types/responses';
import { useGetQueryParams } from './useGetQueryParams';
import { useGetToken } from './useGetToken';

export const useGetCategories = (): FetchedData<Category[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  const { token } = useGetToken();
  const { page, pageSize, createdBy } = useGetQueryParams();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.categories, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response: ProductResponse) => {
          setCategories(response.data);
          setIsLoading(false);
        })
        .catch((error: ErrorResponse) => {
          setError(error.response.data.error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError('Please log in');
    }
  }, [token, page, pageSize, createdBy]);

  return {
    data: categories,
    loading: isLoading,
    error,
  };
};

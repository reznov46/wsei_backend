import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { Product } from '../types/product';
import { ErrorResponse, ProductResponse } from '../types/responses';
import { useGetQueryParams } from './useGetQueryParams';
import { useGetToken } from './useGetToken';

export const useGetProducts = (
  customPageNum?: number,
  customPageSize?: number,
): FetchedData<Product[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  const { token } = useGetToken();
  const { page, pageSize, createdBy, categoryId } = useGetQueryParams();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.products, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: customPageNum ?? page,
            pageSize: customPageSize ?? pageSize,
            createdBy,
            categoryId,
          },
        })
        .then((response: ProductResponse) => {
          setProducts(response.data);
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
  }, [token, page, pageSize, createdBy, categoryId]);

  return {
    data: products,
    loading: isLoading,
    error,
  };
};

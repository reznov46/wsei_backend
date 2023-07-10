import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { Product } from '../types/product';
import { ErrorResponse, ProductResponse } from '../types/responses';
import { useGetQueryParams } from './useGetQueryParams';
import { useGetToken } from './useGetToken';

export const useGetProducts = (): FetchedData<Product[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  const { token } = useGetToken();
  const { page, pageSize, createdBy } = useGetQueryParams();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.userProducts, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            pageSize,
            createdBy,
          },
        })
        .then((response: ProductResponse) => {
          setProducts(response.data);
          setIsLoading(false);
          console.log(response);
        })
        .catch((error: ErrorResponse) => {
          setError(error.response.data);
          setIsLoading(false);
          console.log(error);
        });
    } else {
      setIsLoading(false);
      setError('Please log in');
    }
  }, [token]);

  return {
    data: products,
    loading: isLoading,
    error,
  };
};

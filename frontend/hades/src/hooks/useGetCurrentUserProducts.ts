import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { Product } from '../types/product';
import { ErrorResponse, ProductResponse } from '../types/responses';
import { useGetToken } from './useGetToken';

export const useGetCurrentUserProducts = (): FetchedData<Product[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const { token } = useGetToken();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.userProducts, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response: ProductResponse) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error: ErrorResponse) => {
          setError(error.response.data);
          setIsLoading(false);
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
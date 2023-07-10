import { useLocation } from 'react-router';

interface UseGetQueryParamsResult {
  [x: string]: string;
}

export const useGetQueryParams = (): UseGetQueryParamsResult => {
  const { search } = useLocation();

  const params = search.slice(1).split('&');
  const keys = params.map((key) => key.slice(0, key.indexOf('=')));

  const getParamValue = (param: string) =>
    param.slice(param.indexOf('=') + 1).toString();

  const entries = new Map(
    keys.map((key, index) => [key, getParamValue(params[index])]),
  );

  return Object.fromEntries(entries);
};

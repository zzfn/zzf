// models/search.ts

import useSWR from 'swr';
import { fetchData } from './api';

type SearchOptions = {
  keyword: string;
};

export function useSearch({ keyword }: SearchOptions) {
  const { data = [] } = useSWR<any[]>(() => {
    if (!keyword) return null;
    const endpoint = '/v1/articles/search/es';
    const queryParams = { keyword };
    return { endpoint, queryParams };
  }, fetchData);

  return { data };
}

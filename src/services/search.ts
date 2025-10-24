// services/search.ts

import useSWR from 'swr';
import type { Article } from 'types/article';
import { fetchData } from './api';

type SearchOptions = {
  keyword: string;
};

export function useSearch({ keyword }: SearchOptions) {
  const { data = [] } = useSWR<Article[] | null>(
    () => {
      if (!keyword) return null;
      const endpoint = '/v1/articles/search/es';
      const queryParams = { keyword };
      return { endpoint, queryParams };
    },
    (config) => fetchData<Article[]>(config),
  );

  return { data: data ?? [] };
}

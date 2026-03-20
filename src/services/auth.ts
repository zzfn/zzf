import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetchData, type FetchConfig } from './api';

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  avatarUrl: string;
  nickname: string;
  discourseExternalId: string;
  discourseGroups: string;
};

export const CURRENT_USER_ENDPOINT = '/v1/app-users/me';

const swrFetcher = <T>(config: FetchConfig) => fetchData<T>(config);

export const useCurrentUser = () => {
  const response = useSWR<CurrentUser | null, Error>(
    {
      endpoint: CURRENT_USER_ENDPOINT,
      fetchParams: {
        credentials: 'include',
      },
    },
    (config) => swrFetcher<CurrentUser>(config),
    {
      shouldRetryOnError: false,
    },
  );

  return {
    ...response,
    currentUser: response.data ?? null,
    isLoading: response.isLoading,
    isAuthenticated: Boolean(response.data),
  };
};

export const useLogout = () => {
  return useSWRMutation<unknown, Error, FetchConfig>(
    {
      endpoint: '/v1/app-users/logout',
      fetchParams: {
        method: 'POST',
        credentials: 'include',
      },
    },
    (config) => swrFetcher<unknown>(config),
  );
};

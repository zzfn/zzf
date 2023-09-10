import { fetchData } from './api';
import useSWRMutation from 'swr/mutation';

export const useCommentOrReply = (action: string, body: any) => {
  return useSWRMutation(
    {
      endpoint: `/v1/${action}`,
      fetchParams: {
        method: 'POST',
        body:JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
    fetchData,
  );
};

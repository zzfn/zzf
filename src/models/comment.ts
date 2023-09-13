import { fetchData } from './api';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

export const useGetComment = ({
  objectType,
  objectId,
}: {
  objectType: string;
  objectId: string;
}) => {
  return useSWR<any[]>(() => {
    const endpoint = '/v1/comments';
    const queryParams = { objectType, objectId };
    return { endpoint, queryParams };
  }, fetchData);
};
export const useCommentOrReply = (action: string, body: any) => {
  return useSWRMutation(
    {
      endpoint: `/v1/${action}`,
      fetchParams: {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
    fetchData,
  );
};

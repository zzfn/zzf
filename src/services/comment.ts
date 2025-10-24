import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { Comment } from 'types/comment';
import { fetchData, type FetchConfig } from './api';

type CommentQuery = {
  objectType: string;
  objectId: string;
};

type CommentPayload = {
  objectId: string;
  objectType: string;
  content: string;
  username?: string | null;
};

type ReplyPayload = {
  commentId: string;
  content: string;
  username?: string | null;
};

type GithubLoginPayload = {
  username?: string | null;
  avatarUrl?: string | null;
};

type CommentAction = 'comments' | 'replies';

const swrFetcher = <T>(config: FetchConfig) => fetchData<T>(config);

export const useGetComment = ({ objectType, objectId }: CommentQuery) => {
  return useSWR<Comment[]>(
    () => {
      const endpoint = '/v1/comments';
      const queryParams = { objectType, objectId };
      return { endpoint, queryParams };
    },
    (config) => swrFetcher<Comment[]>(config),
  );
};

export const useCommentOrReply = (action: CommentAction, body: CommentPayload | ReplyPayload) => {
  return useSWRMutation<unknown, Error, FetchConfig>(
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
    (config) => swrFetcher<unknown>(config),
  );
};

export const useGithubLogin = (body: GithubLoginPayload) => {
  return useSWRMutation<unknown, Error, FetchConfig>(
    {
      endpoint: `/v1/app-users/github/login`,
      fetchParams: {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
    (config) => swrFetcher<unknown>(config),
  );
};

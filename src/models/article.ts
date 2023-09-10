import { fetchData } from './api';
import useSWRMutation from 'swr/mutation';

export const useUpdateArticleViews = (articleId: string) => {
  const { trigger, ...mutationState } = useSWRMutation(
    {
      endpoint: `/v1/articles/${articleId}/views`,
      fetchParams: {
        method: 'PUT',
      },
    },
    fetchData,
  );

  return {
    updateViews: trigger,
    ...mutationState,
  };
};

'use client';
import { useEffect, useState } from 'react';
import { useUpdateArticleViews } from '../../../../models/article';

const ArticleCount = ({ id }: { id: string }) => {
  const { updateViews } = useUpdateArticleViews(id);
  const [count, setCount] = useState(0);
  useEffect(() => {
    updateViews().then((res: number) => {
      setCount(res);
    });
  }, [id]);
  return count;
};
export default ArticleCount;

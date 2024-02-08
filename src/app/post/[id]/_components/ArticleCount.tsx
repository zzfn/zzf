'use client';
import { useEffect, useState } from 'react';
import { useUpdateArticleViews } from 'models/article';
import AnimatedNumber from '../../../../components/AnimatedNumber';

const ArticleCount = ({ id }: { id: string }) => {
  const [number, setNumber] = useState(0);
  const { updateViews } = useUpdateArticleViews(id);
  useEffect(() => {
    updateViews().then((res: number) => {
      setNumber(res);
    });
  }, [id]);

  return <AnimatedNumber number={number} />;
};
export default ArticleCount;

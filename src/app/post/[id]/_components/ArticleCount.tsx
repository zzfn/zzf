'use client';
import { useEffect, useState } from 'react';
import { useUpdateArticleViews } from 'models/article';
import { motion, useSpring, useTransform } from 'framer-motion';

const ArticleCount = ({ id }: { id: string }) => {
  const [number, setNumber] = useState(0);
  const { updateViews } = useUpdateArticleViews(id);
  const count = useSpring(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    updateViews().then((res: number) => {
      setNumber(res);
      count.set(res);
    });
  }, [id]);

  return <motion.div>{rounded}</motion.div>;
};
export default ArticleCount;

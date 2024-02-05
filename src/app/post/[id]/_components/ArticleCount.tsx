"use client";
import { useEffect, useState } from 'react';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';

const ArticleCount = ({ id }: { id: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const {viewCount} = await fetchData<Article>({
        endpoint: `/v1/articles/${id}`,
      });;
      setCount(viewCount);
    };
    fetchData1();
  });
  return count;
};
export default ArticleCount;

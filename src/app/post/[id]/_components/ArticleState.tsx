'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { articleAtom } from "atoms/articleAtoms";
import { useUpdateArticleViews } from "../../../../models/article";

const fetcher = (url: string) =>
  fetch(url, {
    method: 'PUT',
  })
    .then((r) => r.json())
    .then(({ data }) => data);
const ArticleState = ({ children, articleState }: any) => {
  const setAtom = useSetAtom(articleAtom);
  const { updateViews } = useUpdateArticleViews(articleState.id);
  useEffect(() => {
    setAtom(articleState);
    updateViews()
  }, [articleState.id]);
  return children;
};
export default ArticleState;

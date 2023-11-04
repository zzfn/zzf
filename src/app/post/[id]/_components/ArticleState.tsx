'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { articleAtom } from "atoms/articleAtoms";
import { useUpdateArticleViews } from "models/article";

const ArticleState = ({ children, articleState }: any) => {
  const setAtom = useSetAtom(articleAtom);
  const { updateViews } = useUpdateArticleViews(articleState.id);
  useEffect(() => {
    setAtom(articleState);
    updateViews().then(r => console.log(r));
  }, [articleState.id]);
  return children;
};
export default ArticleState;

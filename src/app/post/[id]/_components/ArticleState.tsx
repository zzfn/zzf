'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { articleAtom } from 'atoms/articleAtoms';
import type { Article } from 'types/article';

type ArticleStateProps = {
  children: ReactNode;
  articleState: Article;
};

const ArticleState = ({ children, articleState }: ArticleStateProps) => {
  const setAtom = useSetAtom(articleAtom);
  useEffect(() => {
    setAtom(articleState);
  }, [articleState, setAtom]);
  return <>{children}</>;
};
export default ArticleState;

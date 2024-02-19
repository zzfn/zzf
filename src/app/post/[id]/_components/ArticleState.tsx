'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { articleAtom } from 'atoms/articleAtoms';

const ArticleState = ({ children, articleState }: any) => {
  const setAtom = useSetAtom(articleAtom);
  useEffect(() => {
    setAtom(articleState);
  }, [articleState.id]);
  return <>{children}</>;
};
export default ArticleState;

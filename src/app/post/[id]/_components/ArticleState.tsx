'use client';
import { atom, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { articleRecoil, articleState as articleAtom } from 'store/store';

const ArticleState = ({ children, articleState }: any) => {
  const setArticleState = useSetRecoilState(articleRecoil);
  const setAtom = useSetAtom(articleAtom);
  useEffect(() => {
    setArticleState(articleState);
    setAtom(articleState);
  }, [articleState.id]);
  return children;
};
export default ArticleState;

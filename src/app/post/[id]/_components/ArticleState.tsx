'use client';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { articleAtom } from 'atoms/articleAtoms';
import { useUpdateArticleViews } from 'models/article';
import { Modal } from '@oc/design';
import Image from 'next/image';

const ArticleState = ({ children, articleState }: any) => {
  const setAtom = useSetAtom(articleAtom);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState('');
  useEffect(() => {
    setAtom(articleState);
    const imgList = document.querySelectorAll('img');
    imgList.forEach((img: any) => {
      img.onclick = () => {
        setVisible(true);
        setSrc(img.src);
      };
    });
  }, [articleState.id]);
  return (
    <>
      <Modal onCancel={() => setVisible(false)} visible={visible}>
        <img src={src} alt={src} />
      </Modal>
      {children}
    </>
  );
};
export default ArticleState;

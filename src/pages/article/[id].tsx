import React, { useEffect } from 'react';
import type { NextPageWithLayout } from '../_app';
import { getArticle, listArchives, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import Head from 'next/head';
import Zooming from 'zooming';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'store';
import ArticleNav from '../../components/ArticleNav';
import { getCdn } from '../../utils/getCdn';
import { Progress } from '@oc/design';
import { css } from '@emotion/css';
import Comments from 'features/comments/Comments';
interface Data {
  content?: string;
  createTime?: string;
  logo?: string;
  id?: string;
  starCount?: number;
  tag: string;
  tagDesc?: string;
  title?: string;
  updateTime?: string;
  viewCount?: number;
  summary?: string;
}

interface ServerProps {
  serverProps: Data;
}

const ArticleDetail: NextPageWithLayout = (props: ServerProps) => {
  const { serverProps } = props;
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    // dispatch({ type: 'count/incrementEffect', payload: 2 });
    updateView({ id: serverProps.id }).then();
    const imgList = document.querySelectorAll('.zoom');
    const zooming = new Zooming({
      enableGrab: false,
      bgColor: 'rgb(0, 0, 0)',
      bgOpacity: '0.5',
    });
    imgList.forEach((node) => {
      zooming.listen(node);
    });
  }, [serverProps.id]);
  return (
    <>
      <Progress />
      <Head>
        <title>{getTitle(serverProps.title)}</title>
      </Head>
      <div
        className={classNames([
          css({
            backgroundImage: `url(${serverProps.logo || getCdn('/assets/default.webp')})`,
            borderRadius: '24px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 50%',
            backgroundSize: 'cover',
          }),
          'h-[544px]',
          'my-6',
          'p-14',
          'w-full',
          'object-cover',
          'rounded',
          'flex',
          'items-center',
          'justify-center',
          'relative',
          'rounded',
          'overflow-hidden',
        ])}
      >
      </div>
      <h1 className={classNames('text-2xl', 'font-medium', 'text-4xl')}>{serverProps.title}</h1>
      <p className='text-base'>{serverProps.summary}</p>
      <ul
        className={classNames(
          'text-[var(--secondary-text)]',
          'flex',
          'flex-wrap',
          'text-sm',
          'my-6',
          'gap-x-3',
        )}
      >
        <li>
          <span>标签</span>
          {serverProps.tag}
        </li>
        <li>
          <span>阅读量</span>
          {serverProps.viewCount}
        </li>
        <li>
          <span>发布于</span>
          {serverProps.createTime}
        </li>
        <li>
          <span>更新于</span>
          {serverProps.updateTime}
        </li>
      </ul>
      <div className='md:grid md:grid-cols-5 gap-x-4 rounded'>
        <article
          className={classNames(
            'w-full md:col-span-4',
            'p-8',
            'prose',
            'prose-headings:scroll-mt-16',
          )}
          dangerouslySetInnerHTML={{
            __html: translateMarkdown(serverProps.content),
          }}
        />
        <ArticleNav source={serverProps.content} />
      </div>
      <Comments id={serverProps.id} />
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await listArchives({});
  const paths = data.articleList.map((_) => ({ params: { id: _.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  if (Array.isArray(id)) return;
  const { data, code } = await getArticle({ id });
  return {
    notFound: code !== 0,
    props: {
      serverProps: data,
    },
    revalidate: 5,
  };
};

export default ArticleDetail;

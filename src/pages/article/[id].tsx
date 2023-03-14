import React, { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from '../_app';
import { getArticle, listArchives, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import Head from 'next/head';
import Zooming from 'zooming';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Evaluation from 'features/Evaluation';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'store';
import Image from 'next/image';
import ArticleNav from '../../components/ArticleNav';
import { getCdn } from '../../utils/getCdn';
import { Layout, Progress } from "../../../../oc-design";

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
      <div className='container py-3 px-3 max-w-4xl md:grid md:grid-cols-5 gap-x-4'>
        <div className='w-full md:col-span-4'>
          <Image
            width={100}
            height={100}
            className={classNames('h-52', 'w-full', 'object-cover', 'mb-3', 'rounded')}
            alt={serverProps.title}
            src={serverProps.logo || getCdn('/midway/denis.webp')}
          />
          <main className={classNames('bg-surface', 'w-full', 'px-6', 'bg-card')}>
            <div>
              <h2
                className={classNames(
                  'text-xl',
                  'text-[var(--primary-text)]',
                  'font-medium',
                  'text-4xl',
                )}
              >
                {serverProps.title}
              </h2>
              <ul
                className={classNames(
                  'text-[var(--secondary-text)]',
                  'flex',
                  'flex-wrap',
                  'text-sm',
                  'mt-6',
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
            </div>
            <article
              className={classNames('prose', 'my-5', 'prose-headings:scroll-mt-16')}
              dangerouslySetInnerHTML={{
                __html: translateMarkdown(serverProps.content),
              }}
            />
            {serverProps.id && <Evaluation id={serverProps.id} />}
          </main>
        </div>
        <ArticleNav source={serverProps.content} />
      </div>
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

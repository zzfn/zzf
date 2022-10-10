import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import React, { useEffect } from 'react';
import { getArticle, listArchives, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Zooming from 'zooming';
import { Progress } from '@ootd/design';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Evaluation from '../../components/Evaluation';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'store';
import ArticleLayout from '../../components/layout/ArticleLayout';
import Image from 'next/future/image';

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
    // updateView({ id: serverProps.id }).then();
    const imgList = document.querySelectorAll('.zoom');
    const zooming = new Zooming({
      enableGrab: false,
      bgColor: 'rgb(0, 0, 0)',
      bgOpacity: '0.5',
    });
    imgList.forEach((node) => {
      zooming.listen(node);
    });
  }, []);
  return (
    <div className={styles.detail}>
      <Head>
        <title>{getTitle(serverProps.title)}</title>
      </Head>
      <>
        <Progress />
        {serverProps.logo && (
          <Image
            width={100}
            height={100}
            className={classNames('h-52', 'w-full', 'object-cover')}
            alt={serverProps.title}
            src={serverProps.logo}
          />
        )}
        <main className={classNames(styles.article, 'bg-primary', 'w-full', 'px-6')}>
          <div>
            <h2 className={classNames('text-xl', 'text-gray-1000', 'font-medium', 'text-4xl')}>
              {serverProps.title}
            </h2>
            <ul className={classNames(styles.tip, 'text-info', 'flex', 'flex-wrap', 'text-sm')}>
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
            className={classNames('markdown-body', 'text-sm')}
            dangerouslySetInnerHTML={{
              __html: translateMarkdown(serverProps.content),
            }}
          />
          {serverProps.id && <Evaluation id={serverProps.id} />}
        </main>
      </>
    </div>
  );
};

ArticleDetail.getLayout = function (page: ReactElement) {
  return <ArticleLayout source={page.props.serverProps.content}>{page}</ArticleLayout>;
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

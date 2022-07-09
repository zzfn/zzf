import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { getArticle, listArchives, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Zooming from 'zooming';
import { Progress } from '@zzf/design';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Evaluation from '../../components/Evaluation';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'store';

interface Data {
  content?: string;
  createTime?: string;
  id?: string;
  starCount?: number;
  tag?: string;
  tagDesc?: string;
  title?: string;
  updateTime?: string;
  viewCount?: number;
}

interface ServerProps {
  serverProps: Data;
}

const ArticleDetail: NextPage<ServerProps> = (props) => {
  const { serverProps = {} } = props;
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.count.incrementAsync(2);
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
    <div className={styles.detail}>
      <Head>
        <title>{getTitle(serverProps.title)}</title>
      </Head>
      <>
        <Progress />
        <main className={classNames(styles.article, 'bg-primary')}>
          <div>
            <h2 className={classNames('text-xl', 'text-gray-1000', 'font-medium', 'text-4xl')}>
              {serverProps.title}
            </h2>
            <ul className={classNames(styles.tip, 'text-info', 'flex', 'flex-wrap', 'text-sm')}>
              <li>
                <span>标签</span>
                {serverProps.tagDesc}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await listArchives({});
  const paths = data.map((_) => ({ params: { id: _.id } }));
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
      serverProps: { ...data },
    },
    revalidate: 5,
  };
};

export default ArticleDetail;

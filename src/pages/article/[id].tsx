import React, { useEffect } from 'react';
import { getArticle, listArchives, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Nav from 'components/article/nav';
import Zooming from 'zooming';
import { Layout, Progress } from '@zzf/design';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';

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

const ArticleDetail: React.FC<ServerProps> = (props) => {
  const { serverProps = {} } = props;

  useEffect(() => {
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
        <Layout.Content>
          <main className={styles.article}>
            <div>
              <h2 className={classNames('text-3xl', 'text-brand')}>{serverProps.title}</h2>
              <ul className={classNames(styles.tip, 'text-secondary', 'flex', 'flex-wrap')}>
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
              className={classNames('markdown-body')}
              dangerouslySetInnerHTML={{
                __html: translateMarkdown(serverProps.content),
              }}
            />
          </main>
        </Layout.Content>
        <Layout.Sidebar>
          <Nav source={serverProps.content} />
        </Layout.Sidebar>
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

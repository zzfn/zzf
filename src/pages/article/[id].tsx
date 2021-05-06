import React from 'react';
import { useRouter } from 'next/router';
import { getArticle, listArchives } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Progress from 'components/article/Progress';
import Nav from 'components/article/nav';
import useLg from 'hooks/useLg';

interface ServerProps {
  serverProps: any;
}

const ArticleDetail: React.FC<ServerProps> = (props) => {
  const isLg = useLg();
  const router = useRouter();
  const { serverProps = {} } = props;
  return (
    <div className={styles.detail}>
      <Head>
        <title>{serverProps.title}~zzf</title>
      </Head>
      {router.isFallback ? (
        <div>加载中</div>
      ) : (
        <>
          <Progress />
          <main className={styles.article}>
            <div className={styles.title}>
              <h1>{serverProps.title}</h1>
            </div>
            <div className={styles.tip}>
              <ul>
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
              className={['markdown-template', styles.content].join(' ')}
              dangerouslySetInnerHTML={{
                __html: translateMarkdown(serverProps.content),
              }}
            />
          </main>
          {isLg && (
            <aside className={styles.sidebar}>
              <Nav source={serverProps.content} />
            </aside>
          )}
        </>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const { data } = await listArchives({});
  const paths = data.map((_) => ({ params: { id: _.id } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const { data } = await getArticle({ id });
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
}

export default ArticleDetail;

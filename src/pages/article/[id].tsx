import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getArticle, listArchives } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Progress from 'components/article/Progress';
import Nav from 'components/article/nav';
import useLg from 'hooks/useLg';
import Zooming from 'zooming';
import { Layout } from '@zzf/design';

interface ServerProps {
  serverProps: any;
}

const ArticleDetail: React.FC<ServerProps> = (props) => {
  const isLg = useLg();
  const router = useRouter();
  const { serverProps = {} } = props;
  useEffect(() => {
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
        <title>{serverProps.title}~zzf</title>
      </Head>
      {router.isFallback ? (
        <div>加载中</div>
      ) : (
        <>
          <Progress />
          <Layout.Content>
            <main className={`${styles.article}`}>
              <div className={styles.title}>
                <h1>{serverProps.title}</h1>
              </div>
              <div className={styles.tip}>
                <ul>
                  <li>
                    <span className={'col-1'}>标签</span>
                    {serverProps.tagDesc}
                  </li>
                  <li>
                    <span className={'col-2'}>阅读量</span>
                    {serverProps.viewCount}
                  </li>
                  <li>
                    <span className={'col-3'}>发布于</span>
                    {serverProps.createTime}
                  </li>
                  <li>
                    <span className={'col-4'}>更新于</span>
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
          </Layout.Content>
          {isLg && (
            <Layout.Sidebar>
              <Nav source={serverProps.content} />
            </Layout.Sidebar>
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

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticle, listArchives, updateStar, updateView } from 'services/article';
import { translateMarkdown } from 'utils/translateMarkdown';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Nav from 'components/article/nav';
import Zooming from 'zooming';
import { Layout, Progress } from '@zzf/design';
import { getTitle } from '../../utils/getTitle';
import classNames from 'classnames';
import type { GetStaticPaths, GetStaticProps } from 'next';
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer';
import Icon from 'components/Icon';

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
  code: number;
}

const ArticleDetail: React.FC<ServerProps> = (props) => {
  const [isStar, setIsStar] = useState(false);
  const router = useRouter();
  const { serverProps = {}, code } = props;

  async function star(id) {
    await updateStar({ id });
    setIsStar(true);
  }

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
      {router.isFallback ? (
        <div>加载中</div>
      ) : code === 0 ? (
        <>
          <Progress />
          <Layout.Content>
            <main className={`${styles.article}`}>
              <div className='Subhead'>
                <h2 className={classNames(styles.title, 'text-3xl')}>{serverProps.title}</h2>
                <div className={classNames('Subhead-description', styles.tip)}>
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
                      <span className={'col-2'}>点赞量</span>
                      {serverProps.starCount}
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
              </div>
              <article
                className={['markdown-body', 'font-mono', styles.content].join(' ')}
                dangerouslySetInnerHTML={{
                  __html: translateMarkdown(serverProps.content),
                }}
              />
            </main>
            <Icon
              onClick={() => star(serverProps.id)}
              className={styles.icon}
              color={isStar ? '#fec02b' : '#3063fb'}
              size={60}
              name={'zan'}
            />
          </Layout.Content>
          <Layout.Sidebar>
            <Nav source={serverProps.content} />
          </Layout.Sidebar>
        </>
      ) : (
        <LottiePlayer size={300} url={'https://cdn.annyyy.com/blog/64166-error-404.json'} />
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await listArchives({});
  const paths = data.map((_) => ({ params: { id: _.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const { data, code } = await getArticle({ id });
  return {
    props: {
      serverProps: { ...data },
      code,
    },
    revalidate: 5,
  };
};

export default ArticleDetail;

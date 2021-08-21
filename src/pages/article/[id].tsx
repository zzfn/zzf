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
}

const ArticleDetail: React.FC<ServerProps> = (props) => {
  const [isStar, setIsStar] = useState(false);
  const { serverProps = {} } = props;

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
      <>
        <Progress />
        <Layout.Content>
          <main className={`${styles.article}`}>
            <div className='Subhead'>
              <h2 className={classNames(styles.title, 'text-3xl')}>{serverProps.title}</h2>
              <div className={classNames('Subhead-description', styles.tip)}>
                <ul className={'color-text-secondary flex flex-wrap'}>
                  <li>
                    <span>标签</span>
                    {serverProps.tagDesc}
                  </li>
                  <li>
                    <span>阅读量</span>
                    {serverProps.viewCount}
                  </li>
                  <li>
                    <span>点赞量</span>
                    {serverProps.starCount}
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
            </div>
            <article
              className={['markdown-body', 'font-mono', styles.content, 'color-text-primary'].join(
                ' ',
              )}
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

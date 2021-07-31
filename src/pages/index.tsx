import React, { useRef, useState } from 'react';
import { Os } from '@zzf/toolkit';
import Head from 'next/head';
import { getHot, lastUpdated, listArticles, overview } from 'api/article';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import styles from 'styles/home.module.scss';
import { formatImg } from '../utils/formatImg';
import Link from 'next/link';
import { diff } from '../utils/time';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';

const Home: React.FC<NextProps<any>> = (props) => {
  const { serverProps } = props;
  const page = useRef(serverProps.current);
  const [noMore, setNoMore] = useState(false);
  const [records, setRecords] = useState(serverProps.records);

  async function handleLoad() {
    console.log(serverProps);
    console.log(Os.getBrowser());
    const { data } = await listArticles({
      current: page.current + 1,
      pageSize: 10,
    });
    setRecords([...records, ...data.records]);
    setNoMore(data.records.length === 0);
    page.current = data.current;
  }

  return (
    <>
      <Head>
        <title>{getTitle('小时光')}</title>
      </Head>
      <BackTop>
        <Image height={40} width={40} layout={'intrinsic'} src={'/static/img/top.png'} />
      </BackTop>
      <Layout>
        <Layout.Content className={'Box'}>
          <Loading
            noMore={noMore}
            key={page.current}
            onLoad={handleLoad}
            loading={<LottiePlayer size={200} url={'https://cdn.annyyy.com/blog/load-more.json'} />}
          >
            {records.map((item: Article) => (
              <ArticleCard key={item.id} dataSource={item} />
            ))}
          </Loading>
        </Layout.Content>
        <Layout.Sidebar>
          <Card icon={'xianxingshezhi'} title={'关于我'}>
            <div className={styles.wrap}>
              <LottiePlayer size={100} url={'https://cdn.annyyy.com/blog/about.json'} />
            </div>
          </Card>
          <Card icon={'xianxingyinle'} title={'关于本站'}>
            <div className={'color-text-primary'}>本次加载时间{props.metric.FCP}ms</div>
          </Card>
          <Card icon={'xianxingshijian'} title={'排行榜'}>
            <ul>
              {serverProps.hot.slice(0, 5).map((n) => (
                <li className={styles.title} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a
                      title={n.title}
                      className={classNames(styles.title, 'flex')}
                      target={'_blank'}
                    >
                      <div className={'truncate w-36'}>{n.title}</div>
                      <div className={'whitespace-nowrap'}>--{n.viewCount}</div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card icon={'xianxingxiaoxi'} title={'最近更新'}>
            <ul>
              {serverProps.list.map((n) => (
                <li className={styles.title} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a
                      title={n.title}
                      className={classNames(styles.title, 'flex')}
                      target={'_blank'}
                    >
                      <div className={'truncate w-36'}>{n.title}</div>
                      <div className={'whitespace-nowrap'}>--{diff(n.updateTime)}</div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </Layout.Sidebar>
      </Layout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const num = 1;
  const size = 10;
  const { data } = await listArticles({ pageNumber: num, pageSize: size });
  const { data: over } = await overview();
  const { data: list } = await lastUpdated();
  const { data: hot } = await getHot();
  return {
    props: {
      serverProps: { ...data, ...over, list, hot },
    },
    revalidate: 1,
  };
};

export default Home;

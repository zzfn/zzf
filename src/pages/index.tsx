import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { lastUpdated, listArticles } from 'api/article';
import { BackTop, Card, Layout, Loading } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import styles from 'styles/home.module.scss';
import Link from 'next/link';
import { diff } from '../utils/time';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';
import Icon from '../components/Icon';

type LastUpdatedListType = {
  title: string;
  id: string;
  updateTime: string;
};

type HomeType = {
  current: number;
  lastUpdatedList: LastUpdatedListType[];
  records: Article[];
};
const Home: React.FC<NextProps<HomeType>> = (props) => {
  const { serverProps } = props;
  const page = useRef(serverProps.current);
  const [noMore, setNoMore] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const [records, setRecords] = useState(serverProps.records);

  async function handleLoad() {
    const { data } = await listArticles({
      current: page.current + 1,
      pageSize: 10,
    });
    setRecords([...records, ...data.records]);
    setNoMore(data.records.length === 0);
    page.current = data.current;
  }

  useEffect(() => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
        setLoadTime(Math.floor(entry.startTime));
      }
    }).observe({ type: 'paint', buffered: true });
  }, []);
  return (
    <>
      <Head>
        <title>{getTitle('小时光')}</title>
      </Head>
      <BackTop>
        <Icon size={40} name={'top'} />
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
              <LottiePlayer size={100} url={'https://cdn.annyyy.com/blog/logo.json'} />
            </div>
          </Card>
          <Card className={'mt-4'} icon={'xianxingyinle'} title={'关于本站'}>
            <div className={'color-text-primary'}>本次加载时间{loadTime}ms</div>
          </Card>
          <Card className={'mt-4'} icon={'xianxingxiaoxi'} title={'最近更新'}>
            <ul>
              {serverProps.lastUpdatedList.map((n) => (
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
  const [pages, lastUpdatedList] = await Promise.all([listArticles({}), lastUpdated()]);
  return {
    props: {
      serverProps: { ...pages.data, lastUpdatedList: lastUpdatedList.data },
    },
    revalidate: 5,
  };
};

export default Home;

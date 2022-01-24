import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { lastUpdated, listArticles } from 'api/article';
import { Card, Layout, Loading, SvgIcon } from '@zzf/design';
import ArticleCard from '../components/article/articleCard';
import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import styles from 'styles/home.module.scss';
import Link from 'next/link';
import { diff } from '../utils/time';
import classNames from 'classnames';
import type { GetStaticProps } from 'next';

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
      <Layout>
        <Layout.Content>
          <Loading
            noMore={noMore}
            key={page.current}
            onLoad={handleLoad}
            loading={
              <LottiePlayer
                size={200}
                url={`${process.env.NEXT_PUBLIC_OSS_URL}/cdn/1632384671572VMLK6m.json`}
              />
            }
          >
            {records.map((item: Article) => (
              <ArticleCard key={item.id} dataSource={item} />
            ))}
          </Loading>
        </Layout.Content>
        <Layout.Sidebar>
          <Card title='关于我'>
            <div className={styles.wrap}>
              <LottiePlayer
                size={100}
                url='https://oss-zzf.zzfzzf.com/cdn/1632384646840vb5kcx.json'
              />
            </div>
          </Card>
          <Card className='mt-4 test' title='关于本站'>
            <div className={classNames('text-info', 'text-sm')}>本次加载时间{loadTime}ms</div>
          </Card>
          <Card className='mt-4' title='最近更新'>
            <ul>
              {serverProps.lastUpdatedList.map((n) => (
                <li className={classNames('flex')} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a
                      title={n.title}
                      className={classNames(
                        'flex',
                        'justify-between',
                        'items-center',
                        'group',
                        'w-full',
                      )}
                      target='_blank'
                    >
                      <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <SvgIcon
                          className={classNames(
                            'group-hover:translate-x-2',
                            'text-primary',
                            'mr-4',
                            'duration-300',
                          )}
                          name='right'
                        />
                        <div
                          className={classNames('truncate', 'font-medium', 'text-lg', 'text-info')}
                        >
                          {n.title}
                        </div>
                      </div>
                      <div className={classNames('whitespace-nowrap', 'text-sm', 'text-gray-1000')}>
                        --{diff(n.updateTime)}
                      </div>
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
  const [pages, lastUpdatedList] = await Promise.all([
    listArticles({ pageSize: 10, current: 1 }),
    lastUpdated(),
  ]);
  return {
    props: {
      serverProps: { ...pages.data, lastUpdatedList: lastUpdatedList.data },
    },
    revalidate: 5,
  };
};

export default Home;

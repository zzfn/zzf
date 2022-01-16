import React from 'react';
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
import { useInfiniteQuery } from 'react-query';
import useFcp from '../hooks/useFcp';

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
  const fcpTime = useFcp();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'projects',
    (k) =>
      listArticles({
        current: k.pageParam,
        pageSize: 10,
      }).then((data) => data.data.records),
    {
      refetchOnWindowFocus: false,
      initialData: {
        pages: [serverProps.records],
        pageParams: [1],
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length ? pages.length + 1 : undefined;
      },
    },
  );

  return (
    <>
      <Head>
        <title>{getTitle('小时光')}</title>
      </Head>
      <BackTop>
        <LottiePlayer size={40} url={'https://oss-zzf.zzfzzf.com/1638431830685XR0zJT.json'} />
      </BackTop>
      <Layout>
        <Layout.Content>
          <Loading
            noMore={!hasNextPage}
            onLoad={fetchNextPage}
            loading={
              <LottiePlayer
                size={200}
                url={'https://oss-zzf.zzfzzf.com/1632384671572VMLK6m.json'}
              />
            }
          >
            {data.pages.map((item, i) => (
              <React.Fragment key={i}>
                {item.map((project) => (
                  <ArticleCard key={project.id} dataSource={project} />
                ))}
              </React.Fragment>
            ))}
          </Loading>
        </Layout.Content>
        <Layout.Sidebar>
          <Card icon={'xianxingshezhi'} title={'关于我'}>
            <div className={styles.wrap}>
              <LottiePlayer
                size={100}
                url={'https://oss-zzf.zzfzzf.com/cdn/1632384646840vb5kcx.json'}
              />
            </div>
          </Card>
          <Card className={'mt-4 test'} icon={'xianxingyinle'} title={'关于本站'}>
            <div className={classNames('text-primary', 'text-sm')}>本次加载时间{fcpTime}ms</div>
          </Card>
          <Card className={'mt-4'} icon={'xianxingxiaoxi'} title={'最近更新'}>
            <ul>
              {serverProps.lastUpdatedList.map((n) => (
                <li className={styles.title} key={n.id}>
                  <Link prefetch={false} href={`/article/${n.id}`}>
                    <a
                      title={n.title}
                      className={classNames(styles.title, 'flex', 'text-sm', 'justify-between')}
                      target={'_blank'}
                    >
                      <div className={'truncate w-48'}>{n.title}</div>
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

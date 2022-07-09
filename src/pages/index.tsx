import React from 'react';
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
import useFcp from '../hooks/useFcp';
import { useInfiniteQuery } from 'react-query';

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
      <Loading
        noMore={!hasNextPage}
        onLoad={fetchNextPage}
        loading={
          <LottiePlayer
            size={200}
            url={`${process.env.NEXT_PUBLIC_CDN_URL}/cdn/1632384671572VMLK6m.json`}
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

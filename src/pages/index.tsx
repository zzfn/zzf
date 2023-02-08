import React, { ReactElement } from 'react';
import Head from 'next/head';
import { listArticles } from 'api/article';
import { Loading } from '@oc/design';
import ArticleCard from 'components/HomeArticleCard';
import LottiePlayer from 'components/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { useInfiniteQuery } from '@tanstack/react-query';
import generateRssFeed from '../utils/generateRssFeed';
import { getCdn } from '../utils/getCdn';
import { NextPageWithLayout } from './_app';
import DefaultNoBg from '../layout/DefaultNoBg';

type HomeType = {
  current: number;
  records: Article[];
};
const Home: NextPageWithLayout = (props: NextProps<HomeType>) => {
  const { serverProps } = props;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['projects'],
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
        return lastPage.length === 10 ? pages.length + 1 : undefined;
      },
    },
  );

  return (
    <>
      <Head>
        <title>{getTitle('首页')}</title>
      </Head>
      <Loading
        noMore={!hasNextPage}
        onLoad={fetchNextPage}
        loading={<LottiePlayer size={200} url={getCdn('/assets/loading.json')} />}
      >
        {data.pages.flat().map((record) => <ArticleCard key={record.id} dataSource={record} />)}
      </Loading>
    </>
  );
};
Home.getLayout = function (page: ReactElement) {
  return <DefaultNoBg>{page}</DefaultNoBg>;
};
export const getStaticProps: GetStaticProps = async () => {
  const pages = await listArticles({ pageSize: 10, current: 1 });
  await generateRssFeed(pages.data.records);
  return {
    props: {
      serverProps: { ...pages.data },
    },
    revalidate: 5,
  };
};

export default Home;

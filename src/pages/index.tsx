import React from 'react';
import Head from 'next/head';
import { listArticles } from 'api/article';
import { Loading } from '@dekopon/design';
import ArticleCard from '../components/article/articleCard';
import LottiePlayer from 'components/LottiePlayer/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { useInfiniteQuery } from '@tanstack/react-query';
import generateRssFeed from '../utils/generateRssFeed';

type HomeType = {
  current: number;
  records: Article[];
};
const Home: React.FC<NextProps<HomeType>> = (props) => {
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
        return lastPage.length ? pages.length + 1 : undefined;
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

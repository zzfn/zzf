import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { articleCount, lastUpdated } from 'api/article';
import { Alert, Button, Card, Tag } from '@oc/design';
import LottiePlayer from 'components/LottiePlayer';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import generateRssFeed from '../utils/generateRssFeed';
import { getCdn } from '../utils/getCdn';
import { NextPageWithLayout } from './_app';
import DefaultNoBg from '../layout/DefaultNoBg';
import Link from 'next/link';
import { diff } from '../utils/time';
import useFcp from '../hooks/useFcp';
import HomeArticleCard from '../components/HomeArticleCard';
import { changelogList } from 'api/changelog';
import dayjs from "dayjs";

type HomeType = {
  articleLatest: Article[];
  articleCount: any;
  changeLog: any;
};
const Home: NextPageWithLayout = (props: HomeType) => {
  const { articleLatest, articleCount,changeLog } = props;
  const loadTime = useFcp();

  return (
    <>
      <Head>
        <title>{getTitle('首页')}</title>
      </Head>
      <Alert className='mb-2'>
        <span className='flex justify-between w-full'>
          <span>{changeLog.title}</span>
          <time className='text-[var(--secondary-text)]'>{dayjs(changeLog.updateTime).format('YYYY-MM-DD')}</time>
        </span>
      </Alert>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2'>
        <Card classNameWrap='col-span-2' title='最近更新'>
          <div className='flex items-center mb-2'>
            <Tag>文章数 {articleCount.article}</Tag>
            <Tag>标签数 {articleCount.tag}</Tag>
            <Tag>本次加载时间 {loadTime} ms</Tag>
          </div>
          <div className='grid grid-cols-1 gap-x-3 gap-y-2'>
            {articleLatest.map((article: Article) => (
              <HomeArticleCard key={article.id} dataSource={article}></HomeArticleCard>
            ))}
          </div>
        </Card>
        <Link className='col-span-2' href='/archive'>
          <Button className='w-full' type='primary'>
            查看更多
          </Button>
        </Link>
      </div>
    </>
  );
};
Home.getLayout = function (page: ReactElement) {
  return <DefaultNoBg>{page}</DefaultNoBg>;
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await lastUpdated();
  const res = await articleCount();
  const r = await changelogList();
  await generateRssFeed(data);
  return {
    props: {
      articleLatest: data,
      articleCount: res.data,
      changeLog: r.data[0],
    },
    revalidate: 5,
  };
};

export default Home;

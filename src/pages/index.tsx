import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import { articleCount, lastCreated, lastUpdated, sortByField } from 'api/article';
import { Alert, Button, Card, Tag } from '@oc/design';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from './_app';
import DefaultNoBg from '../layout/DefaultNoBg';
import Link from 'next/link';
import useFcp from '../hooks/useFcp';
import Image from 'next/image';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import { diff } from '../utils/time';
import { IconSafe, IconSchedule, IconTag } from '@oc/icon';
import { getCdn } from '../utils/getCdn';
import classNames from 'classnames';

type HomeType = {
  articleLatest: Article[];
  articleCount: any;
  changeLog: any;
};
const Home: NextPageWithLayout = (props: HomeType) => {
  const { articleLatest, articleCount, changeLog } = props;
  const loadTime = useFcp();
  const [filter, setFilter] = useState('updateTime');
  const [list, setList] = useState(articleLatest);
  const [loading,setLoading] = useState(false);
  const handleClick = (field: string) => async () => {
    if(loading)return
    setFilter(field);
    setLoading(true)
    const { data } = await sortByField({ field });
    setLoading(false)
    setList(data);
  };
  return (
    <>
      <Head>
        <title>{getTitle('首页')}</title>
      </Head>
      <Alert className='mb-2'>
        <span className='flex justify-between w-full'>
          <span>{changeLog.title}</span>
          <time className='text-[var(--secondary-text)]'>
            {dayjs(changeLog.updateTime).format('YYYY-MM-DD')}
          </time>
        </span>
      </Alert>
      <Card
        className='mb-3'
        title={
          <span className='flex justify-between w-full'>
            <span>首页</span>
            <span className='flex items-center gap-x-2'>
              <Tag>文章数 {articleCount.article}</Tag>
              <Tag>标签数 {articleCount.tag}</Tag>
              <Tag>本次加载时间 {loadTime} ms</Tag>
            </span>
          </span>
        }
      >
        <ul className='h-10 leading-10 flex justify-around text-[var(--secondary-text)]'>
          {[
            { label: '最近更新', value: 'updateTime', icon: IconSafe },
            { label: '最近创建', value: 'createTime', icon: IconSchedule },
            { label: '浏览量', value: 'viewCount', icon: IconTag },
          ].map((_) => (
            <li
              onClick={handleClick(_.value)}
              key={_.value}
              className={classNames(
                filter === _.value &&
                  'text-[var(--accent)] font-semibold border-b-2 border-current',
                'flex-1 text-center cursor-pointer',
              )}
            >
              {React.createElement(_.icon, { className: 'mr-1' })}
              {_.label}
            </li>
          ))}
        </ul>
      </Card>
      {list.map((article: Article) => (
        <Card className='flex py-2 mb-3' key={article.id}>
          <div>
            <Image
              className='mr-3 object-cover rounded-lg h-16 w016'
              width={64}
              height={64}
              src={article.logo || getCdn('/midway/default-article.webp')}
              alt={article.title}
            />
          </div>
          <div>
            <div className='text-[var(--primary-text)] font-semibold'>{article.title}</div>
            <div className='text-[var(--secondary-text)] text-sm'>
              {article.tag} · {article.viewCount} 个阅读 · 更新于：{diff(article.updateTime)}
            </div>
            <div className='text-[var(--secondary-text)] text-xs'>{article.summary}</div>
          </div>
        </Card>
      ))}
      <Link className='col-span-2' href='/archive'>
        <Button className='w-full' type='primary'>
          查看更多
        </Button>
      </Link>
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

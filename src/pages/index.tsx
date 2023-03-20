import React, { useState } from 'react';
import Head from 'next/head';
import { articleCount, sortByField } from 'api/article';
import { Alert, Button, Card, List, ListItem, Tab, Tabs, Tag } from '@oc/design';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import useFcp from '../hooks/useFcp';
import Image from 'next/image';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import { diff } from '../utils/time';
import { IconClose, IconCode, IconSearch } from '@oc/icon';
import { getCdn } from '../utils/getCdn';
import classNames from 'classnames';
import { css } from '@emotion/css';
import IconSymbols from '../components/IconSymbols';

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
  const [loading, setLoading] = useState(false);
  const handleClick = async (field: string) => {
    if (loading) return;
    setFilter(field);
    setLoading(true);
    const { data } = await sortByField({ field });
    setLoading(false);
    setList(data);
  };
  return (
    <>
      <Head>
        <title>{getTitle('首页')}</title>
      </Head>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>首页</h1>
      <Tabs className='my-4' onChange={handleClick}>
        <Tab
          className='cursor-pointer'
          key='updateTime'
          icon={<IconSymbols className='text-2xl' icon='schedule' />}
        >
          最近更新
        </Tab>
        <Tab
          className='cursor-pointer'
          key='createTime'
          icon={<IconSymbols className='text-2xl' icon='add_circle' />}
        >
          最近创建
        </Tab>
        <Tab
          className='cursor-pointer'
          key='viewCount'
          icon={<IconSymbols className='text-2xl' icon='visibility' />}
        >
          浏览量
        </Tab>
      </Tabs>
      <div className='grid desktop:grid-cols-3 gap-2'>
        {list.map((article: Article) => (
          <Link key={article.id} target='_blank' href={`/article/${article.id}`}>
            <div
              className={classNames(
                'bg-surface-1 rounded-3xl hover:bg-secondary-container cursor-pointer flow-root',
                css`
                  transition: background-color 300ms cubic-bezier(0.2, 0, 0, 1);
                `,
              )}
            >
              <div
                className={css`
                  background-repeat: no-repeat;
                  background-position: 50%;
                  background-size: cover;
                  height: 200px;
                  width: 100%;
                  border-radius: 24px;
                  overflow: hidden;
                  background-image: url(${article.logo || getCdn('/midway/default-article.webp')});
                `}
              />
              <div className={classNames('m-6')}>
                <span className='text-sm flex items-center gap-x-2'>
                  <span className='flex items-center gap-x-1 text-xm'>
                    <IconSymbols icon='label' /> {article.tag}
                  </span>
                  <span className='flex items-center gap-x-1 text-sm'>
                    <IconSymbols icon='schedule' />
                    {dayjs(article.updateTime).format('YYYY-MM-DD')}
                  </span>
                  <span className='flex items-center gap-x-1 text-sm'>
                    <IconSymbols icon='visibility' /> {article.viewCount}
                  </span>
                </span>
                <div className='text-2xl text-[var(--primary-text)] font-semibold my-4'>
                  {article.title}
                </div>
                <div className='text-xs line-clamp-2'>{article.summary}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link className='col-span-2' href='/archive'>
        <Button className='w-full my-4' variant='outlined'>
          查看更多
        </Button>
      </Link>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await sortByField({ field: 'updateTime' });
  const res = await articleCount();
  return {
    props: {
      articleLatest: data,
      articleCount: res.data,
    },
    revalidate: 5,
  };
};

export default Home;

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
      <Tabs className='my-4' onChange={handleClick}>
        <Tab className='cursor-pointer' key='updateTime' icon={IconClose}>
          最近更新
        </Tab>
        <Tab className='cursor-pointer' key='createTime' icon={IconSearch}>
          最近创建
        </Tab>
        <Tab className='cursor-pointer' key='viewCount' icon={IconCode}>
          浏览量
        </Tab>
      </Tabs>
      <List>
        {list.map((article: Article) => (
          <ListItem key={article.id}>
              <Image
                className={classNames(
                  'flex-shrink-0 object-cover rounded-lg h-16 w-16 mr-4',
                  css`
                    width: 114px;
                    height: 64px;
                  `,
                )}
                width={114}
                height={64}
                src={article.logo || getCdn('/midway/default-article.webp')}
                alt={article.title}
              />
            <div>
              <Link
                href={`/article/${article.id}`}
                className='text-[var(--primary-text)] font-semibold'
              >
                {article.title}
              </Link>
              <div className='text-[var(--secondary-text)] text-sm'>
                {article.tag} · {article.viewCount} 个阅读 · 更新于：{diff(article.updateTime)}
              </div>
              <div className='text-[var(--secondary-text)] text-xs'>{article.summary}</div>
            </div>
          </ListItem>
        ))}
      </List>
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

import React from 'react';
import Head from 'next/head';
import { listArchives } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getTitle } from 'utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';
import { Alert, Card } from '@oc/design';

type ListProps = {
  createTime: Date;
  id: string;
  title: string;
};

interface ArchiveProps {
  title: string;
  articleList: Article[];
}

function renderMonth(time: string, list: ListProps[]) {
  return (
    <Card className='mb-4' key={time}>
      <h3>{`${time} 共 ${list.length} 篇文章`}</h3>
      <ul>
        {list?.map((item) => (
          <li className={classNames('text-sm', 'text-[var(--secondary-text)]')} key={item.id}>
            <span className={classNames('font-mono', 'text-info', 'mr-3')}>
              {dayjs(item.createTime).format('YYYY-MM-DD')}
            </span>
            <Link href={`/article/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

const Archive: React.FC<NextProps<ArchiveProps>> = ({ serverProps }) => {
  const timeLine = serverProps.articleList.reduce((prev: Record<string, ListProps[]>, curr) => {
    const time = dayjs(curr.createTime).format('YYYY-MM');
    if (Object.prototype.hasOwnProperty.call(prev, time)) {
      prev[time].push(curr as any);
    } else {
      prev[time] = [];
      prev[time].push(curr as any);
    }
    return prev;
  }, {});
  return (
    <div>
      <Head>
        <title>{getTitle('归档')}</title>
      </Head>
      <h1 className='mt-18 text-2.5xl text-center'>
        归档
        {/*<Image width={200} height={200}  src={getCdn('/assets/nabi.webp')} alt="" />*/}
      </h1>
      <h2 className='mb-8 text-lg text-center'>
        很好! 目前共计 <strong>{serverProps.articleList.length}</strong> 篇文章。 继续努力。⛽️
      </h2>
      <div>{Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await listArchives({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
export default Archive;

import React from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getTitle } from 'utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';
import { Alert } from '@oc/design';

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
    <div key={time}>
      <h3 className={classNames(styles.title, 'text-info', 'text-base')}>
        {time} 共 <span>{list.length}</span> 篇文章
      </h3>
      <ul>
        {list?.map((item) => (
          <li className={classNames(styles.item, 'text-sm', 'text-info')} key={item.id}>
            <span className={classNames('font-mono', 'text-info', 'mr-3')}>
              {dayjs(item.createTime).format('YYYY-MM-DD')}
            </span>
            <Link href={`/article/${item.id}`}>
              <a className={styles.subTitle}>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
    <div className={classNames(styles.archiveWrap)}>
      <Head>
        <title>{getTitle('归档')}</title>
      </Head>
      <Alert className={classNames('text-base')}>
        很好! 目前共计 <strong>{serverProps.articleList.length}</strong> 篇文章。 继续努力。⛽️
      </Alert>
      <div className={`${styles.timeLine}`}>
        {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
      </div>
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

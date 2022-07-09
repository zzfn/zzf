import React, { useState } from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives, listTags } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';

type ListProps = {
  createTime: Date;
  id: string;
  title: string;
};
type TagsProps = {
  count: number;
  tag: string;
  code: string;
};

interface ArchiveProps {
  list: ListProps[];
  tags: TagsProps[];
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
  const [active, setActive] = useState(0);
  const timeLine = serverProps.list.reduce((prev: Record<string, ListProps[]>, curr) => {
    const time = dayjs(curr.createTime).format('YYYY-MM');
    if (Object.prototype.hasOwnProperty.call(prev, time)) {
      prev[time].push(curr);
    } else {
      prev[time] = [];
      prev[time].push(curr);
    }
    return prev;
  }, {});
  return (
    <div className={styles.archiveWrap}>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {serverProps.tags.map((item) => (
        <React.Fragment key={item.code}>
          <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
            <a className={classNames(styles.menuItem, 'text-sm', 'flex', 'items-center')}>
              <span>{item.tag}</span>
              <span className={styles.counter}>{item.count}</span>
            </a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: list }, { data: tags }] = await Promise.all([listArchives({}), listTags({})]);
  return {
    props: {
      serverProps: { list, tags },
    },
    revalidate: 1,
  };
};
export default Archive;

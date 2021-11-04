import React, { useState } from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives, listTags } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Layout } from '@zzf/design';
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

function renderMonth(time, list = []) {
  return (
    <div key={time}>
      <h3 className={classNames(styles.title, 'text-secondary')}>
        {time} 共 <span>{list.length}</span> 篇文章
      </h3>
      <ul>
        {list?.map((item) => (
          <li
            className={classNames(
              styles.item,
              'text-base',
              'text-primary',
              'border-solid',
              'border-b',
              'border-current',
            )}
            key={item.id}
          >
            <span style={{ color: '#8a8a8a', marginRight: '10px', fontFamily: 'Helvetica Neue' }}>
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
  const timeLine = serverProps.list.reduce((prev, curr) => {
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
        <title>{getTitle('归档')}</title>
      </Head>
      <header className={classNames('text-xl')}>
        很好! 目前共计 <strong>{serverProps.list.length}</strong> 篇文章。 继续努力。⛽️
      </header>
      <Layout className={'hidden md:flex'}>
        <Layout.Content>
          <div className={`${styles.timeLine} color-text-primary`}>
            {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
          </div>
        </Layout.Content>
        <Layout.Sidebar className={styles.menu}>
          {serverProps.tags.map((item) => (
            <React.Fragment key={item.code}>
              <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
                <a className={styles.menuItem}>
                  <span>{item.tag}</span>
                  <span className={styles.counter}>{item.count}</span>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </Layout.Sidebar>
      </Layout>
      <nav className='md:hidden'>
        <div className={classNames('w-full', styles.tabList)} role='tablist'>
          <div
            onClick={() => setActive(0)}
            className={`${styles.underlineNavItem} flex-1`}
            role='tab'
            aria-selected={active === 0}
          >
            按时间
          </div>
          <div
            onClick={() => setActive(1)}
            aria-selected={active === 1}
            className={`${styles.underlineNavItem} flex-1}`}
            role='tab'
          >
            按标签
          </div>
        </div>
      </nav>
      <section className={'md:hidden color-text-primary'}>
        {active === 0 ? (
          <div className={styles.timeLine}>
            {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
          </div>
        ) : (
          <div className={styles.menu}>
            {serverProps.tags.map((item) => (
              <React.Fragment key={item.code}>
                <Link
                  href={{
                    pathname: `/tag/${item.code}`,
                    query: { desc: encodeURIComponent(item.tag) },
                  }}
                >
                  <a className={styles.menuItem}>
                    <span>{item.tag}</span>
                    <span className={styles.counter}>{item.count}</span>
                  </a>
                </Link>
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
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

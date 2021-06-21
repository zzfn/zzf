import React, { useState } from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives, listTags } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Layout } from '@zzf/design';
import { getTitle } from '../utils/getTitle';

interface ArchiveProps {
  list: any[];
  tags: any[];
}
function renderMonth(time, list = []) {
  return (
    <div key={time}>
      <h3 className={`${styles.title}`}>
        {time} 共 <span className='Counter'>{list.length}</span> 篇文章
      </h3>
      <ul>
        {list?.map((item) => (
          <li className={styles.item} key={item.id} style={{ borderBottom: '1px dashed #ccc' }}>
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
      <header>
        很好! 目前共计 <strong>{serverProps.list.length}</strong> 篇文章。 继续努力。⛽️
      </header>
      <Layout className={'hidden md:flex'}>
        <Layout.Content>
          <div className={styles.timeLine}>
            {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
          </div>
        </Layout.Content>
        <Layout.Sidebar className={'menu'}>
          {serverProps.tags.map((item) => (
            <React.Fragment key={item.code}>
              <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
                <a className={'menu-item'}>
                  <span>{item.tag}</span>
                  <span className='Counter Counter--primary'>{item.count}</span>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </Layout.Sidebar>
      </Layout>
      <nav className='md:hidden UnderlineNav '>
        <div className='UnderlineNav-body w-full' role='tablist'>
          <div
            onClick={() => setActive(0)}
            className={`UnderlineNav-item flex-1 ${styles.timeLine}`}
            role='tab'
            aria-selected={active === 0}
          >
            按时间
          </div>
          <button
            onClick={() => setActive(1)}
            aria-selected={active === 1}
            className='UnderlineNav-item flex-1'
            role='tab'
            type='button'
          >
            按标签
          </button>
        </div>
      </nav>
      <section className={'md:hidden'}>
        {active === 0 ? (
          <div className={styles.timeLine}>
            {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
          </div>
        ) : (
          <>
            {serverProps.tags.map((item) => (
              <React.Fragment key={item.code}>
                <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
                  <a className={'menu-item'}>
                    <span>{item.tag}</span>
                    <span className='Counter Counter--primary'>{item.count}</span>
                  </a>
                </Link>
              </React.Fragment>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: list } = await listArchives({});
  const { data: tags } = await listTags({});
  return {
    props: {
      serverProps: { list, tags },
    },
    revalidate: 1,
  };
};
export default Archive;

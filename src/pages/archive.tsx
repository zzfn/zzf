import React from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Tags } from '../components/Tags/Tags';

interface ArchiveProps {
  serverProps: any;
}

const Archive: React.FC<ArchiveProps> = ({ serverProps }) => {
  const timeLine = serverProps.reduce((prev, curr) => {
    const time = dayjs(curr.createTime).format('YYYY-MM');
    if (Object.prototype.hasOwnProperty.call(prev, time)) {
      prev[time].push(curr);
    } else {
      prev[time] = [];
      prev[time].push(curr);
    }
    return prev;
  }, {});
  function renderMonth(time, list = []) {
    return (
      <div key={time}>
        <h3 className={styles.title}>
          {time} 共 <Tags>{list.length}</Tags> 篇文章
        </h3>
        <ul>
          {list?.map((item) => (
            <li className={styles.item} key={item.id} style={{ borderBottom: '1px dashed #ccc' }}>
              <span style={{ color: '#8a8a8a', marginRight: '10px' }}>
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
  return (
    <div className={styles.archiveWrap}>
      <Head>
        <title>归档~zzf</title>
      </Head>
      <header>
        很好! 目前共计 <strong>{serverProps.length}</strong> 篇文章。 继续努力。⛽️
      </header>
      <div className={styles.timeLine}>
        {Object.keys(timeLine).map((item) => renderMonth(item, timeLine[item]))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data } = await listArchives({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
export default Archive;

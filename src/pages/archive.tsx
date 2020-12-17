import React from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listArchives } from 'services/article';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Tag } from 'components/Tag/Tag';

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
          {time} 共 <Tag color={'#af00fa'}>{list.length}</Tag> 篇文章
        </h3>
        <ul>
          {list?.map((item) => (
            <li className={styles.item} key={item.id} style={{ borderBottom: '1px dashed #ccc' }}>
              <span style={{ color: '#8a8a8a', marginRight: '10px' }}>
                {dayjs(item.createTime).format('YYYY-MM-DD')}
              </span>
              <Link href={`/article/${item.id}`}>
                <a style={{ color: '#2e405b' }}>{item.title}</a>
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
        <title>zzf~归档</title>
      </Head>
      很好! 目前共计 {serverProps.length} 篇日志。 继续努力。
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

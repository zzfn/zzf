import React from 'react';
import styles from './searchCard.module.scss';
import { useRouter } from 'next/router';
import { Tag } from 'components/Tag/Tag';
import dayjs from 'dayjs';
import abstractFn from '../../utils/abstractFn';

interface SearchCardProps {
  dataSource: Article;
  show: boolean;
}

export default function SearchCard<SearchCardProps>({ dataSource }) {
  const router = useRouter();

  function toDetail(id: string) {
    router.push(`/article/${id}`);
  }

  return (
    <div onClick={() => toDetail(dataSource.id)} className={styles.card}>
      <h3>
        <span className={styles.title} style={{ marginLeft: '10px' }}>
          <div
            dangerouslySetInnerHTML={{
              __html: dataSource.title,
            }}
          />
        </span>
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: abstractFn(dataSource.content),
        }}
      />
      <ul>
        <li title={'标签'}>
          <Tag color='#333'>
            <div
              dangerouslySetInnerHTML={{
                __html: dataSource.tagDesc,
              }}
            />
          </Tag>
        </li>
        <li title={'浏览量'}>
          <span className={styles.num}>{dataSource.viewCount}</span>
        </li>
      </ul>
    </div>
  );
}

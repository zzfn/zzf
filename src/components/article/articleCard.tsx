import React from 'react';
import styles from './articleCard.module.scss';
import { useRouter } from 'next/router';
import { Tag } from 'components/Tag/Tag';
import dayjs from 'dayjs';
import abstractFn from 'utils/abstractFn';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  const router = useRouter();

  function toDetail(id: string) {
    router.push(`/article/${id}`);
  }

  return (
    <div onClick={() => toDetail(dataSource.id)} className={styles.card}>
      <div className={styles.time}>{dayjs(dataSource.createTime).format('YYYY-MM-DD')}</div>
      <h3>
        {dataSource.orderNum ? <Tag color='#9494E3'>置顶</Tag> : null}
        <span className={styles.title} style={{ marginLeft: '10px' }}>
          {dataSource.title}
        </span>
      </h3>
      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: abstractFn(dataSource.content),*/}
      {/*  }}*/}
      {/*/>*/}
      <ul>
        <li title={'标签'}>
          <Tag color='#0095C7'>{dataSource.tagDesc}</Tag>
        </li>
        <li title={'浏览量'}>
          <span className={styles.num}>{dataSource.viewCount}</span>
        </li>
      </ul>
    </div>
  );
}

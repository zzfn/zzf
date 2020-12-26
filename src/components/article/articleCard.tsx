import React from 'react';
import styles from './articleCard.module.scss';
import { Tag } from 'components/Tag/Tag';
import dayjs from 'dayjs';
import Link from 'next/link';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  return (
    <div className={styles.card}>
      <div className={styles.time}>{dayjs(dataSource.createTime).format('YYYY-MM-DD')}</div>
      <Link href={`/article/${dataSource.id}`}>
        <a>
          <h3>
            {dataSource.orderNum ? <Tag color='#9494E3'>置顶</Tag> : null}
            <span className={styles.title} style={{ marginLeft: '10px' }}>
              {dataSource.title}
            </span>
          </h3>
        </a>
      </Link>
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

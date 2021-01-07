import React from 'react';
import styles from './articleCard.module.scss';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Tags } from 'components/Tags/Tags';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  return (
    <div className={styles.card}>
      <div className={styles.time}>{dayjs(dataSource.createTime).format('YYYY-MM-DD')}</div>
      <Link href={`/article/${dataSource.id}`}>
        <a target={'_blank'}>
          <h3>
            {dataSource.orderNum ? <Tags>置顶</Tags> : null}
            <span className={styles.title} style={{ marginLeft: '10px' }}>
              {dataSource.title}
            </span>
          </h3>
        </a>
      </Link>
      <ul>
        <li title={'标签'}>
          <Link href={`/tag/${dataSource.tag}`}>
            <a>
              <Tags>{dataSource.tagDesc}</Tags>
            </a>
          </Link>
        </li>
        <li title={'浏览量'}>
          <span className={styles.num}>{dataSource.viewCount}</span>
        </li>
      </ul>
    </div>
  );
}

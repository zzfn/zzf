import React from 'react';
import styles from './articleCard.module.scss';
import { Tag } from 'components/Tag/Tag';
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
      <Link prefetch={false} href={`/article/${dataSource.id}`}>
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
          <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
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

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href={`/article/${dataSource.id}`}>
          <a className={styles.title} target={'_blank'}>
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum ? <Tags>置顶</Tags> : null}
      </div>
      <p style={{ padding: '0 10px' }}>
        {dataSource.content.match(/[\u4e00-\u9fa5\w]/g).slice(0, 100)}
      </p>
      <ul>
        <li title={'标签'}>
          标签
          <Link href={`/tag/${dataSource.tag}`}>
            <a>
              <Tags>{dataSource.tagDesc}</Tags>
            </a>
          </Link>
        </li>
        <li title={'浏览量'}>
          浏览量
          <Tags>{dataSource.viewCount}</Tags>
        </li>
        <li className={styles.time} title={'发布时间'}>
          Created {dayjs(dataSource.createTime).format('YYYY-MM-DD')}
        </li>
        <li className={styles.time} title={'更新时间'}>
          Updated {dayjs(dataSource.updateTime).format('YYYY-MM-DD')}
        </li>
      </ul>
    </div>
  );
}

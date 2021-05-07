import React from 'react';
import styles from './articleCard.module.scss';
import Link from 'next/link';
import { diff } from '../../utils/time';
import { Tag } from '@zzf/design';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard<ArticleCardProps>({ dataSource }) {
  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a className={styles.title} target={'_blank'}>
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum ? <Tag>置顶</Tag> : null}
      </div>
      <p style={{ padding: '0 10px' }}>
        {dataSource.content.match(/[\u4e00-\u9fa5\w]/g).slice(0, 100)}
      </p>
      <ul>
        <li title={'标签'}>
          标签
          <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
            <a>
              <Tag>{dataSource.tagDesc}</Tag>
            </a>
          </Link>
        </li>
        <li className={styles.time} title={'发布时间'}>
          Created {diff(dataSource.createTime)}
        </li>
        <li className={styles.time} title={'更新时间'}>
          Updated {diff(dataSource.updateTime)}
        </li>
      </ul>
    </div>
  );
}

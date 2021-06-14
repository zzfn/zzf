import React from 'react';
import styles from './articleCard.module.scss';
import Link from 'next/link';
import { diff } from '../../utils/time';
import { Tag } from '@zzf/design';
import Image from 'next/image';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={'flex items-center'}>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a className={styles.cardTitle} target={'_blank'}>
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum ? (
          <Image
            className={styles.recommend}
            height={30}
            width={30}
            layout={'intrinsic'}
            src={'/static/img/recommend.png'}
          />
        ) : null}
      </div>
      <p className={'truncate px-4'}>
        {dataSource.content.replace(/[^\u4e00-\u9fa5\w]/g, '').slice(0, 100)}
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

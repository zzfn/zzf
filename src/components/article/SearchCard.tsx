import React from 'react';
import styles from './searchCard.module.scss';
import Link from 'next/link';
import { Tag } from '@zzf/design';

type SearchCardProps = {
  dataSource: Article;
};

const SearchCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <div className={styles.card}>
      <Link href={`/article/${dataSource.id}`}>
        <a className={styles.title} target={'_blank'}>
          <h3 className={styles.title} style={{ marginLeft: '10px' }}>
            <div
              dangerouslySetInnerHTML={{
                __html: dataSource.title,
              }}
            />
          </h3>
        </a>
      </Link>
      <div
        style={{ width: '100%' }}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />
      <ul>
        <li title={'标签'}>
          <Tag>
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
};
export default SearchCard;

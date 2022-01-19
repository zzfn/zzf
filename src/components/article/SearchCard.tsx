import React from 'react';
import styles from './searchCard.module.scss';
import Link from 'next/link';
import { Tag } from '@zzf/design';
import classNames from 'classnames';

type SearchCardProps = {
  dataSource: Article;
};

const SearchCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <div className={styles.card}>
      <Link href={`/article/${dataSource.id}`}>
        <a className={styles.title} target='_blank'>
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
        className={classNames('break-all', 'px-3', 'mb-2')}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />
      <Tag>
        <div
          dangerouslySetInnerHTML={{
            __html: dataSource.tagDesc,
          }}
        />
      </Tag>
    </div>
  );
};
export default SearchCard;

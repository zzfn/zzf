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
      <div className='flex'>
        <Tag>
          <div
            dangerouslySetInnerHTML={{
              __html: dataSource.tagDesc,
            }}
          />
        </Tag>
        ·
        <Link href={`/article/${dataSource.id}`}>
          <a target='_blank'>
            <h3
              dangerouslySetInnerHTML={{
                __html: dataSource.title,
              }}
              className={classNames(styles.title, 'font-bold', 'text-xl')}
            />
          </a>
        </Link>
      </div>
      <div
        className={classNames('break-all', 'px-1', 'mb-2')}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />
    </div>
  );
};
export default SearchCard;

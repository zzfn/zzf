'use client';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type SearchCardProps = {
  dataSource: any;
};

const SearchArticleCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <div className='bg-opacity group rounded-lg border border-default p-4 transition-all hover:border-accent hover:shadow-sm'>
      <div className='mb-3'>
        <Link href={`/post/${dataSource.id}`} className='inline-block'>
          <h3
            dangerouslySetInnerHTML={{
              __html: dataSource.title,
            }}
            className={classNames(
              'font-mono text-xl font-bold text-default',
              'transition-colors group-hover:text-accent',
              'relative after:absolute after:bottom-0 after:left-0',
              'after:h-[2px] after:w-0 after:bg-accent',
              'after:transition-all group-hover:after:w-full',
            )}
          />
        </Link>
      </div>
      <div
        className={classNames(
          'prose-sm prose-neutral dark:prose-invert',
          'line-clamp-2 text-muted',
          'px-1',
        )}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />

      {/* 添加底部元信息 */}
      <div className='mt-4 flex items-center gap-4 text-xs text-muted'>
        <div className='flex items-center gap-1'>
          <span className='h-1 w-1 rounded-full bg-accent-emphasis'></span>
          <span>{dataSource.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchArticleCard;

'use client';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type SearchArticle = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

type SearchCardProps = {
  dataSource: SearchArticle;
};

const SearchArticleCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <div className='bg-opacity group border-border-default hover:border-border-accent-emphasis rounded-lg border p-4 transition-all hover:shadow-sm'>
      <div className='mb-3'>
        <Link href={`/post/${dataSource.id}`} className='inline-block'>
          <h3
            dangerouslySetInnerHTML={{
              __html: dataSource.title,
            }}
            className={classNames(
              'text-fg-default font-mono text-xl font-bold',
              'group-hover:text-fg-accent transition-colors',
              'relative after:absolute after:bottom-0 after:left-0',
              'after:bg-bg-accent after:h-[2px] after:w-0',
              'after:transition-all group-hover:after:w-full',
            )}
          />
        </Link>
      </div>
      <div
        className={classNames('prose-sm dark:prose-invert', 'text-fg-muted line-clamp-2', 'px-1')}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />

      {/* 添加底部元信息 */}
      <div className='text-fg-muted mt-4 flex items-center gap-4 text-xs'>
        <div className='flex items-center gap-1'>
          <span className='bg-bg-accent-emphasis h-1 w-1 rounded-full'></span>
          <span>{dataSource.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchArticleCard;

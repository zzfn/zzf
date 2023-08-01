"use client";
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { translateMarkdown } from "../utils/translateMarkdown";

type SearchCardProps = {
  dataSource: any;
};

const SearchArticleCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <>
      <div className='flex'>
        <Link target='_blank' href={`/post/${dataSource.id}`}>
          <h3
            dangerouslySetInnerHTML={{
              __html: dataSource.title,
            }}
            className={classNames('font-bold', 'text-xl', 'text-primary')}
          />
        </Link>
      </div>
      <div
        className={classNames('break-all', 'px-1', 'mb-6', 'text-secondary')}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />
    </>
  );
};
export default SearchArticleCard;

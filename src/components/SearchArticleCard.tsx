import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type SearchCardProps = {
  dataSource: any;
};

const SearchArticleCard: React.FC<SearchCardProps> = ({ dataSource }) => {
  return (
    <>
      <div className='flex'>
        <Link href={`/article/${dataSource.id}`}>
          <a target='_blank'>
            <h3
              dangerouslySetInnerHTML={{
                __html: dataSource.title,
              }}
              className={classNames( 'font-bold', 'text-xl','text-primary')}
            />
          </a>
        </Link>
      </div>
      <div
        className={classNames('break-all', 'px-1', 'mb-6','text-secondary')}
        dangerouslySetInnerHTML={{
          __html: dataSource.content,
        }}
      />
    </>
  );
};
export default SearchArticleCard;

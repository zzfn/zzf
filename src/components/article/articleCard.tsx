import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <>
      <div className='mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-3.5 bg-primary'>
        <div className='flex justify-between'>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-primary font-semibold'>
              <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
                {dataSource.tagDesc}
              </Link>
              ·
              {dayjs(
                Math.max(
                  new Date(dataSource.createTime).getTime(),
                  new Date(dataSource.updateTime).getTime(),
                ),
              ).format('YYYY-MM-DD')}
            </div>
            <Link prefetch={false} href={`/article/${dataSource.id}`}>
              <a
                target='_blank'
                className='block mt-1 text-lg leading-tight font-medium text-primary hover:underline'
              >
                {dataSource.title}
              </a>
            </Link>
            <p className='mt-2 text-slate-500 text-secondary'>{dataSource.summary}</p>
          </div>
          {dataSource.logo && (
            <div className='shrink-0'>
              <img
                className='h-36 w-48 object-scale-down'
                src={dataSource.logo}
                alt={dataSource.title}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

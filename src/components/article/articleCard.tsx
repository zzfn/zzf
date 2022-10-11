import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/future/image';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <>
      <div className='mx-auto rounded-xl border border-neutral3 overflow-hidden mb-3.5 bg-primary'>
        <div className='flex justify-between'>
          <div className='px-6 py-2 flex flex-col align-center justify-center'>
            <div className='uppercase tracking-wide text-sm text-primary-3 font-semibold'>
              <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
                {dataSource.tag}
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
                className='block mt-1 text-lg leading-tight font-medium text-primary-4 hover:underline'
              >
                {dataSource.title}
              </a>
            </Link>
            <p className='mt-2 text-slate-500 text-neutral-2'>{dataSource.summary}</p>
          </div>
          {dataSource.logo && (
            <div className='shrink-0'>
              <Image
                width={100}
                height={100}
                className='w-32 md:w-48 h-36 object-cover'
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

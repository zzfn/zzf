import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Card } from '@oc/design';

interface ArticleCardProps {
  dataSource: Article;
}

export default function HomeArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <>
      <Card className='mb-3.5'>
        <div className='flex justify-between'>
          <div className='flex flex-col align-center justify-center'>
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
            <Link
              target='_blank'
              className='block mt-1 text-lg leading-tight font-medium text-primary hover:underline'
              prefetch={false}
              href={`/article/${dataSource.id}`}
            >
              {dataSource.title}
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
      </Card>
    </>
  );
}

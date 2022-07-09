import React from 'react';
import Link from 'next/link';
import { diff } from '../../utils/time';
import classNames from 'classnames';
import Image from 'next/image';
import { SvgIcon, Tag } from '@zzf/design';
import dayjs from 'dayjs';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-3.5 bg-primary'>
        <div className='md:flex'>
          <div className='md:shrink-0'>
            <img
              className='h-48 w-full object-cover md:h-full md:w-48'
              src={dataSource.logo}
              alt='Man looking at item at a store'
            />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
              {dataSource.tagDesc}·
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
                className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'
              >
                {dataSource.title}
              </a>
            </Link>
            <p className='mt-2 text-slate-500'>{dataSource.summary}</p>
          </div>
        </div>
      </div>
    </>
  );
}

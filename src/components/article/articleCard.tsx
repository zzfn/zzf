import React from 'react';
import Link from 'next/link';
import { diff } from '../../utils/time';
import classNames from 'classnames';
import Icon from '../Icon';
import { Tag } from '@zzf/design';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <div className={classNames('py-4', 'px-2', 'group')}>
      <div className='flex items-center'>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a
            className={classNames(
              'text-gray-1000',
              'hover:text-primary',
              'text-xl',
              'font-bold',
              'group-hover:text-primary',
              'duration-300',
            )}
            target='_blank'
          >
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum > 0 && (
          <Icon
            className={classNames(
              'float-right',
              'transform',
              '-translate-y-4',
              'text-xl',
              'text-info',
            )}
            name='zhiding'
          />
        )}
      </div>
      <p className={classNames('py-4', 'text-info', 'text-base')}>
        {dataSource.content.replace(/[^\u4e00-\u9fa5\w]/g, '').slice(0, 100)}
      </p>
      <ul className={classNames('flex', 'items-center', 'mt-2', 'text-info')}>
        <li className='w-1/4 md:w-32' title='标签'>
          <Tag>
            <Link prefetch={false} href={`/tag/${dataSource.tag}?title=${dataSource.tagDesc}`}>
              <a>{dataSource.tagDesc}</a>
            </Link>
          </Tag>
        </li>
        <li className='w-1/3 md:w-36 text-sm' title={dataSource.createTime}>
          Created {diff(dataSource.createTime)}
        </li>
        <li className='w-1/3 md:w-36 text-sm' title={dataSource.updateTime}>
          Updated {diff(dataSource.updateTime)}
        </li>
      </ul>
    </div>
  );
}

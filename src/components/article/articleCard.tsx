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
    <div className={classNames('border-b', 'border-solid', 'py-4', 'px-2', 'border-primary')}>
      <div className={'flex items-center'}>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a
            className={classNames('text-primary', 'hover:text-brand', 'text-lg', 'font-semibold')}
            target={'_blank'}
          >
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum ? (
          <Icon
            className={classNames(
              'float-right',
              'transform',
              '-translate-y-4',
              'text-xl',
              'text-secondary',
            )}
            name={'zhiding'}
          />
        ) : null}
      </div>
      <p className={'truncate px-4 text-secondary text-sm'}>
        {dataSource.content.replace(/[^\u4e00-\u9fa5\w]/g, '').slice(0, 100)}
      </p>
      <ul className={classNames('flex', 'items-center', 'mt-2', 'text-secondary')}>
        <li className={'w-1/4 md:w-32'} title={'标签'}>
          <Tag>
            <Link prefetch={false} href={`/tag/${dataSource.tag}?title=${dataSource.tagDesc}`}>
              <a className={'text-brand'}>{dataSource.tagDesc}</a>
            </Link>
          </Tag>
        </li>
        <li className={'w-1/3 md:w-36 text-sm'} title={dataSource.createTime}>
          Created {diff(dataSource.createTime)}
        </li>
        <li className={'w-1/3 md:w-36 text-sm'} title={dataSource.updateTime}>
          Updated {diff(dataSource.updateTime)}
        </li>
      </ul>
    </div>
  );
}

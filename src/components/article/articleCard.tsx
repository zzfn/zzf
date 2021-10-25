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
    <div
      className={classNames('border-b', 'border-solid', 'py-4 px-8')}
    >
      <div className={'flex items-center'}>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a
            className={classNames(
              'text-secondary',
              'hover:text-primary',
              'text-2xl',
              'font-semibold',
            )}
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
              'text-2xl',
              'text-secondary',
            )}
            name={'zhiding'}
          />
        ) : null}
      </div>
      <p className={'truncate px-4 color-text-tertiary'}>
        {dataSource.content.replace(/[^\u4e00-\u9fa5\w]/g, '').slice(0, 100)}
      </p>
      <ul className={classNames('flex', 'items-center', 'mt-2', 'color-text-tertiary')}>
        <li className={'w-1/4 md:w-32'} title={'标签'}>
          <Tag>
            <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
              <a className={'color-text-secondary'}>{dataSource.tagDesc}</a>
            </Link>
          </Tag>
        </li>
        <li className={'w-1/3 md:w-36'} title={dataSource.createTime}>
          Created {diff(dataSource.createTime)}
        </li>
        <li className={'w-1/3 md:w-36'} title={dataSource.updateTime}>
          Updated {diff(dataSource.updateTime)}
        </li>
      </ul>
    </div>
  );
}

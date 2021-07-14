import React from 'react';
import styles from './articleCard.module.scss';
import Link from 'next/link';
import { diff } from '../../utils/time';
import classNames from 'classnames';
import Icon from '../Icon';

interface ArticleCardProps {
  dataSource: Article;
}

export default function ArticleCard({ dataSource }: ArticleCardProps): JSX.Element {
  return (
    <div className={classNames(styles.card, 'Box-row', 'anim-fade-in')}>
      <div className={'flex items-center'}>
        <Link prefetch={false} href={`/article/${dataSource.id}`}>
          <a className={styles.cardTitle} target={'_blank'}>
            {dataSource.title}
          </a>
        </Link>
        {dataSource.orderNum ? <Icon className={styles.recommend} name={'zhiding'} /> : null}
      </div>
      <p className={'truncate px-4'}>
        {dataSource.content.replace(/[^\u4e00-\u9fa5\w]/g, '').slice(0, 100)}
      </p>
      <ul>
        <li className={'w-1/4 md:w-32'} title={'标签'}>
          <Link prefetch={false} href={`/tag/${dataSource.tag}`}>
            <a className='Label Label--primary'>{dataSource.tagDesc}</a>
          </Link>
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

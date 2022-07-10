import React from 'react';
import styles from 'styles/archive.module.scss';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';

type ListProps = {
  createTime: Date;
  id: string;
  title: string;
};
type TagsProps = {
  count: number;
  tag: string;
  code: string;
};

interface ArchiveProps {
  list: ListProps[];
  tags: TagsProps[];
}

const Archive: React.FC<NextProps<ArchiveProps>> = ({ serverProps }) => {
  return (
    <div className={styles.archiveWrap}>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {serverProps.tags.map((item) => (
        <React.Fragment key={item.code}>
          <Link href={`/tag/${item.code}`}>
            <a className={classNames(styles.menuItem, 'text-sm', 'flex', 'items-center')}>
              <span>{item.tag}</span>
              <span className={styles.counter}>{item.count}</span>
            </a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: tags }] = await Promise.all([listTags({})]);
  return {
    props: {
      serverProps: { tags },
    },
    revalidate: 1,
  };
};
export default Archive;

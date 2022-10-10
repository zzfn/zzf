import React from 'react';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';
import { Tag } from '@dekopon/design';

type TagsProps = {
  count: number;
  tag: string;
  code: string;
};

interface ArchiveProps {
  tags: TagsProps[];
}

const Archive: React.FC<NextProps<ArchiveProps>> = ({ serverProps }) => {
  return (
    <div className='bg-primary flex flex-wrap'>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {JSON.stringify(serverProps.tags)}
      {serverProps.tags.map((item) => (
        <React.Fragment key={item.tag}>
          <Link href={`/tag/${item.tag}`}>
            <a className={classNames('flex', 'items-center', 'justify-between', 'ml-3', 'mb-2')}>
              <Tag>
                # {item.tag}
                <span className='text-brand-primary ml-2'>{item.count}</span>
              </Tag>
            </a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: tags } = await listTags({});
  return {
    props: {
      serverProps: { tags },
    },
    revalidate: 1,
  };
};
export default Archive;

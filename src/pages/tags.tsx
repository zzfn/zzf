import React from 'react';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';

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
    <div className='bg-primary'>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {serverProps.tags.map((item) => (
        <React.Fragment key={item.code}>
          <Link href={`/tag/${item.code}`}>
            <a className={classNames( 'flex', 'items-center','justify-between','w-1/2','ml-3')}>
              <span># {item.tag}</span>
              <span className='text-brand-primary'>{item.count}</span>
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

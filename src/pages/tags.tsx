import React, { useState } from 'react';
import Head from 'next/head';
import { listArchives, listTags } from 'services/article';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { Tag } from '@oc/design';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Link from 'next/link';

type TagsProps = {
  count: number;
  tag: string;
  code: string;
};

interface ArchiveProps {
  tags: TagsProps[];
}

const Archive: React.FC<NextProps<ArchiveProps>> = ({ serverProps }) => {
  const [currentTag, setCurrentTag] = useState<string>();
  const { data } = useQuery({
    queryKey: ['listArchives', currentTag],
    queryFn: async () => {
      const { data } = await listArchives({ code: currentTag });
      return data;
    },
  });
  return (
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>标签</h1>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      <div className='flex gap-2'>
        {serverProps.tags.map((item) => (
          <Tag key={item.tag} onClick={() => setCurrentTag(item.tag)}>
            # {item.tag}
            <span className='text-neutral-1 ml-2'>{item.count}</span>
          </Tag>
        ))}
      </div>
      <ul className={classNames('text-base', 'text-on-surface','bg-surface-1','rounded','p-6')}>
        {data?.articleList.map((item) => (
          <li key={item.id}>
            <span className='font-mono'>{item.createTime}</span>-
            <Link href={`/article/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
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

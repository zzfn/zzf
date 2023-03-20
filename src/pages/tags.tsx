import React from 'react';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { Card, Tag } from '@oc/design';
import Image from 'next/image';
import { getCdn } from '../utils/getCdn';

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
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>标签</h1>
      <Card>
        <Head>
          <title>{getTitle('标签')}</title>
        </Head>
        <div className='flex gap-2'>
          {serverProps.tags.map((item) => (
            <Link key={item.tag} href={`/tag/${item.tag}`}>
              <Tag>
                # {item.tag}
                <span className='text-neutral-1 ml-2'>{item.count}</span>
              </Tag>
            </Link>
          ))}
        </div>
      </Card>
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

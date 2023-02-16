import React from 'react';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import classNames from 'classnames';
import { Card, Tag } from "@oc/design";

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
    <Card title="标签" className='flex flex-wrap bg-card'>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {serverProps.tags.map((item) => (
        <React.Fragment key={item.tag}>
          <Link className={classNames('flex', 'items-center', 'justify-between', 'ml-3', 'mb-2')} href={`/tag/${item.tag}`}>
              <Tag size='large'>
                # {item.tag}
                <span className='text-neutral-1 ml-2'>{item.count}</span>
              </Tag>
          </Link>
        </React.Fragment>
      ))}
    </Card>
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

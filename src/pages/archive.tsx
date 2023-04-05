import React, { useState } from 'react';
import Head from 'next/head';
import { listArchives, listTags } from 'services/article';
import { getTitle } from '../utils/getTitle';
import type { GetStaticProps } from 'next';
import { List, ListItem, Tag } from '@oc/design';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import dayjs from 'dayjs';
import { css } from '@emotion/css';

type TagsProps = {
  count: number;
  tag: string;
};

interface ArchiveProps {
  tags: TagsProps[];
}

const Archive: React.FC<NextProps<ArchiveProps>> = ({ serverProps }) => {
  const [currentTag, setCurrentTag] = useState<string>('');
  const { data } = useQuery({
    queryKey: ['listArchives', currentTag],
    queryFn: async () => {
      const { data } = await listArchives({ code: currentTag });
      return data;
    },
  });
  return (
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>归档</h1>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      <div className='flex flex-wrap gap-2 mb-2'>
        {serverProps.tags.map((item) => (
          <Tag
            className={
              currentTag === item.tag
                ? css({
                    '&[role]': {
                      backgroundColor: 'var(--md-sys-color-inverse-surface)',
                      color: 'var(--md-sys-color-inverse-on-surface)',
                      '&:hover': {
                        backgroundColor: 'var(--md-sys-color-inverse-surface)',
                        color: 'var(--md-sys-color-inverse-on-surface)',
                      },
                    },
                  })
                : undefined
            }
            key={item.tag}
            onClick={() => setCurrentTag(item.tag)}
          >
            # {item.tag}
            <span className='text-neutral-1 ml-2'>{item.count}</span>
          </Tag>
        ))}
      </div>
      <List>
        {data?.map((item) => (
          <ListItem key={item.id}>
            <span className='font-mono mr-3'>{dayjs(item.createTime).format('YYYY-MM-DD')}</span>
            <Link className='hover:underline underline-offset-2' href={`/post/${item.id}`}>
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>
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

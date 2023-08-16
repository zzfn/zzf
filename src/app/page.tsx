import React from 'react';
import IconSymbols from '../components/IconSymbols';
import Link from 'next/link';
import dayjs from 'dayjs';
import { sortByField } from "api/article";

export default async function Page() {
  const { data } = await sortByField({field:'updateTime'});
  return (
    <>
      <h3 className='my-8 text-2.5xl flex justify-between items-center'>
        <span>Recent Posts</span>
        <Link href='/'>
          <IconSymbols icon='all_inclusive' />
        </Link>
      </h3>
      <div className='flex flex-col gap-y-2'>
        {data.map((post: any) => (
          <a
            key={post.id}
            href={`/post/${post.id}`}
            className='flex justify-between hover:bg-muted p-2 rounded'
          >
            <span>{post.title}</span>
            <time className='font-mono font-thin text-muted'>
              {dayjs(post.createTime).format('YYYY-MM-DD')}
            </time>
          </a>
        ))}
      </div>
    </>
  );
}

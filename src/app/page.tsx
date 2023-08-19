import React from 'react';
import IconSymbols from '../components/IconSymbols';
import Link from 'next/link';
import dayjs from 'dayjs';
import { sortByField } from 'api/article';
import { diff } from '../utils/time';
import { Tooltip } from '@oc/design';

export default async function Page() {
  const { data } = await sortByField({ field: 'createTime' });
  return (
    <div className='py-6'>
      <div className='grid grid-cols-2'>
        <div className='text-xl flex justify-center items-center flex-col gap-y-2'>
          <p>看看最近我都写了些什么，</p>
          <p>或许你会发现一些有趣的东西。</p>
        </div>
        <div className='flex flex-col gap-y-2'>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='hover:bg-muted p-3 rounded-xl border border-default hover:border-primary flex flex-col gap-y-1'
            >
              <div>{post.title}</div>
              <div className='flex items-center gap-x-2 text-xs text-muted'>
                <time className='font-mono'>{diff(post.createTime)}</time>
                {post.createTime !== post.updateTime && (
                  <Tooltip content={post.updateTime}>
                    <span>（已编辑）</span>
                  </Tooltip>
                )}
                <span># {post.tag}</span>
              </div>
            </a>
          ))}
          <Link href='/post'>
            <p className='text-center text-muted cursor-pointer hover:underline'>
              还有更多，去查看
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

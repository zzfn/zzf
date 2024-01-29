import { Tooltip } from '@oc/design';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'utils/time';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';
import TimeDiff from './_components/TimeDiff';
import HomeIcon from '../components/HomeIcon';

export const metadata: Metadata = {
  title: 'Home',
};

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    queryParams: {
      limit: '6',
      order: 'updated_at desc',
    },
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <div className='flex h-[calc(100vh_-_72px)] flex-col items-center justify-between p-28 lg:flex-row'>
        <p className='text-4xl leading-loose text-muted'>
          Hi, I&apos;m krupp👋。
          <br />
          <span className='font-thin'>A Js and Go Full Stack </span>
          <br />
          <span className='rounded py-3 font-medium hover:bg-muted'>
            {'<'}Developer{'/>'}
          </span>
        </p>
        <HomeIcon />
      </div>
      <div className='grid lg:grid-cols-2'>
        <div className='flex flex-col items-center justify-center gap-y-2 text-xl'>
          <p>看看最近我都写了些什么，</p>
          <p>或许你会发现一些有趣的东西。</p>
        </div>
        <div className='flex flex-col gap-y-2'>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='hover:border-primary flex flex-col gap-y-1 rounded-xl border border-default p-3 hover:bg-muted'
            >
              <div>{post.title}</div>
              <div className='flex items-center gap-x-2 text-xs text-muted'>
                <time className='font-mono'>
                  <TimeDiff time={post.createdAt} />
                </time>
                {post.createdAt !== post.updatedAt && (
                  <Tooltip content={format(post.updatedAt)}>
                    <span>（已编辑）</span>
                  </Tooltip>
                )}
                <span># {post.tag}</span>
              </div>
            </a>
          ))}
          <Link href='/post'>
            <p className='cursor-pointer text-center text-muted hover:underline'>
              还有更多，去查看
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

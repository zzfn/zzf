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
      <div className='flex justify-between h-[calc(100vh_-_72px)] items-center p-28 flex-col lg:flex-row'>
        <p className='text-4xl text-muted leading-loose'>
          Hi, I&apos;m krupp👋。
          <br />
          <span className='font-thin'>A Js and Go Full Stack </span>
          <br />
          <span className='font-medium hover:bg-muted rounded py-3'>
            {'<'}Developer{'/>'}
          </span>
        </p>
        <HomeIcon/>
      </div>
      <div className='grid lg:grid-cols-2'>
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
            <p className='text-center text-muted cursor-pointer hover:underline'>
              还有更多，去查看
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

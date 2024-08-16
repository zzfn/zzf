import { Tooltip } from '@oc/design';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'utils/time';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';
import Image from 'next/image';
import { IconLabel } from '@oc/icon';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '👋奇趣生活实验室',
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
async function getConfig() {
  return fetchData<Record<string, any>>({
    endpoint: '/v1/config/site',
  });
}
export default async function Page() {
  const data = await getData();
  const config = await getConfig();
  const cookieStore = cookies();
  return (
    <div>
      <div className='flex items-center gap-y-6'>
        <div className='flex w-3/4 flex-col items-center justify-center gap-y-6'>
          <p className='text-3xl font-normal'>
            Hi, I&apos;m <span className='font-bold'>{config.name}</span>👋。
          </p>
          <p className='text-muted'>{config.slug}</p>
        </div>
        <Image
          priority={true}
          className='aspect-square h-80 w-80 rounded-full object-cover'
          width={4}
          height={3}
          alt='avatar'
          src={config.avatar}
        />
      </div>
      <div>
        <h6 className='flex items-center text-xl text-accent'>
          <IconLabel />
          Recent blog posts
        </h6>
        <div className='grid md:grid-cols-2'>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='hover:border-primary flex flex-col gap-y-1 rounded p-3 hover:bg-muted'
            >
              <div className='text-center text-xl text-accent'>{post.title}</div>
              <div className='flex justify-center gap-x-2 text-xs text-muted'>
                更新于
                <Tooltip content={format(post.updatedAt)}>
                  <time className='font-mono'>{dayjs(post.updatedAt).format('YYYY-MM-DD')}</time>
                </Tooltip>
                <span># {post.tag}</span>
              </div>
            </a>
          ))}
        </div>
        <Link
          className='my-2 block rounded-2xl border border-muted px-6 py-4 text-center transition-transform hover:-translate-y-0.5'
          href='/post'
        >
          View More
        </Link>
      </div>
    </div>
  );
}

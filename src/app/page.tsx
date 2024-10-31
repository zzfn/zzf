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

  return (
    <div className='mx-auto max-w-6xl px-4 py-12'>
      {/* 个人信息部分 */}
      <div className='mb-16 flex flex-col items-center gap-12 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 p-8 md:flex-row'>
        <Image
          priority={true}
          className='aspect-square h-64 w-64 transform rounded-full object-cover ring-4 ring-purple-200 transition-transform duration-300 hover:scale-105 md:h-80 md:w-80'
          width={400}
          height={400}
          alt='avatar'
          src={config.avatar}
        />
        <div className='flex flex-col items-center gap-y-6 md:items-start'>
          <p className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-normal text-transparent md:text-5xl'>
            Hi, I&apos;m <span className='font-bold'>{config.name}</span>👋
          </p>
          <p className='text-lg text-gray-600'>{config.slug}</p>
        </div>
      </div>

      {/* 博客文章部分 */}
      <div>
        <h6 className='mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent'>
          Recent blog posts
        </h6>
        <div className='grid gap-6 md:grid-cols-2'>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='group flex flex-col gap-y-3 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-purple-300 hover:shadow-xl'
            >
              <div className='text-xl font-semibold text-gray-800 transition-colors group-hover:text-purple-600'>
                {post.title}
              </div>
              <div className='flex items-center gap-x-3 text-sm text-gray-500'>
                <span>更新于</span>
                <Tooltip content={format(post.updatedAt)}>
                  <time className='font-mono'>{dayjs(post.updatedAt).format('YYYY-MM-DD')}</time>
                </Tooltip>
                <span className='rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600'>
                  {post.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        <Link
          className='mt-8 block rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-center font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
          href='/post'
        >
          View More
        </Link>
      </div>
    </div>
  );
}

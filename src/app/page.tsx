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
    <div className='mx-auto max-w-3xl px-4 py-8'>
      {/* Profile Section - Instagram Style */}
      <div className='mb-12'>
        <div className='flex items-center gap-8'>
          <Image
            priority={true}
            className='h-24 w-24 rounded-full object-cover ring-4 ring-pink-100 md:h-32 md:w-32'
            width={128}
            height={128}
            alt='avatar'
            src={config.avatar}
          />
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-xl font-semibold text-gray-900'>{config.name}</h1>
            <p className='text-sm text-gray-500'>{config.slug}</p>
            <div className='flex gap-x-6 text-sm'>
              <div>
                <span className='font-semibold'>{data.length}</span> 篇文章
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Stories */}
      <div className='mb-8 flex gap-4 overflow-x-auto pb-4'>
        {['技术', '生活', '随笔', '代码'].map((story) => (
          <div key={story} className='flex flex-col items-center gap-y-1'>
            <div className='h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px]'>
              <div className='h-full w-full rounded-full bg-white p-[2px]'>
                <div className='h-full w-full rounded-full bg-gray-100'></div>
              </div>
            </div>
            <span className='text-xs'>{story}</span>
          </div>
        ))}
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {data.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className='group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md'
          >
            {/* Post Preview */}
            <div className='w-full bg-gradient-to-br from-purple-50 to-pink-50 p-6'>
              <h2 className='mb-3 line-clamp-2 text-lg font-medium text-gray-800'>{post.title}</h2>
              <div className='flex items-center gap-x-2 text-xs text-gray-500'>
                <time>{dayjs(post.updatedAt).format('YYYY-MM-DD')}</time>
                <span className='rounded-full bg-gray-100 px-2 py-0.5'>{post.tag}</span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100'>
              <div className='text-white'>
                <span className='font-medium'>查看详情</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <Link
        className='mt-8 block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-center text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-blue-700'
        href='/post'
      >
        查看更多文章
      </Link>
    </div>
  );
}

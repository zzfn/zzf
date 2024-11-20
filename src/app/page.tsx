import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
import Image from 'next/image';
import dayjs from 'dayjs';

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
      {/* Profile Section */}
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
            <h1 className='text-xl font-semibold text-default'>{config.name}</h1>
            <p className='animate-typing w-fit overflow-hidden whitespace-nowrap border-r-2 border-gray-500 pr-1 font-mono text-sm text-muted'>
              {config.slug}
            </p>
          </div>
        </div>
      </div>

      {/* 添加最近活跃状态 */}
      <div className='mb-12 rounded-xl bg-muted p-6'>
        <h2 className='mb-4 font-medium text-default'>最近在做什么 ⚡️</h2>
        <div className='space-y-3'>
          <div className='flex items-center gap-3 text-sm text-muted'>
            <span className='h-2 w-2 rounded-full bg-green-400'></span>
            <span>正在开发新的个人网站</span>
          </div>
          <div className='flex items-center gap-3 text-sm text-muted'>
            <span className='h-2 w-2 rounded-full bg-blue-400'></span>
            <span>学习 Rust 编程语言</span>
          </div>
          <div className='flex items-center gap-3 text-sm text-muted'>
            <span className='h-2 w-2 rounded-full bg-purple-400'></span>
            <span>研究 AI 应用开发</span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {data.map((post: any) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className='group relative overflow-hidden rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-cyan-500/20'
          >
            {/* Post Preview */}
            <div className='relative w-full rounded-xl bg-muted p-6'>
              <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10'></div>
              <div className='relative'>
                <h2 className='mb-3 line-clamp-2 font-mono text-lg font-medium text-muted'>
                  {post.title}
                </h2>
                <div className='flex items-center gap-x-3 text-xs text-gray-400'>
                  <time className='flex items-center gap-1'>
                    <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-accent-emphasis'></span>
                    {dayjs(post.updatedAt).format('YYYY-MM-DD')}
                  </time>
                  <span className='rounded-md border border-gray-700 bg-inset px-2 py-0.5 font-mono tracking-wider text-muted'>
                    {post.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/80 to-purple-500/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100'>
              <div className='flex items-center gap-2 text-onEmphasis'>
                <span className='font-mono tracking-wider'>VIEW POST</span>
                <span className='animate-pulse'>_</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button - 调整上边距 */}
      <Link
        className='group relative mt-12 block overflow-hidden rounded-lg bg-emphasis px-8 py-3 text-center'
        href='/post'
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-[500%] w-[200%] animate-spin bg-gradient-to-tr from-violet-500 via-cyan-500 to-purple-500 opacity-50 blur-lg'></div>
        </div>
        <span className='relative flex items-center justify-center gap-2 font-mono text-sm font-medium text-onEmphasis'>
          <span>EXPLORE MORE</span>
          <span className='animate-pulse'>_</span>
        </span>
      </Link>
    </div>
  );
}

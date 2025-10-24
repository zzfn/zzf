import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
import Image from 'next/image';
import dayjs from 'dayjs';
import type { CSSProperties } from 'react';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

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
  return fetchData<SiteConfig>({
    endpoint: '/v1/config/site',
  });
}

export default async function Page() {
  const data = await getData();
  const config = await getConfig();

  const activityItems = [
    {
      label: '正在开发新的个人网站',
      color: 'var(--color-bg-accent-emphasis)',
    },
    {
      label: '学习 Rust 编程语言',
      color: 'color-mix(in srgb, var(--color-bg-accent) 70%, transparent)',
    },
    {
      label: '研究 AI 应用开发',
      color: 'color-mix(in srgb, var(--color-bg-accent-muted) 80%, transparent)',
    },
  ];

  return (
    <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
      {/* Hero区域 - 液态玻璃风格 */}
      <div className='animate-in fade-in slide-in-from-top-4 mb-12 duration-700'>
        <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]'>
          {/* 玻璃背景层 */}
          <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_90%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_80%,transparent)]' />

          {/* 光晕效果 */}
          <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--color-bg-accent-emphasis)] opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-30' />

          {/* 内容层 */}
          <div className='relative flex items-center gap-6 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_8%,transparent)] sm:gap-8 sm:p-10'>
            {/* 头像 */}
            <div className='relative flex-shrink-0'>
              <div className='absolute inset-0 rounded-full bg-[color:var(--color-bg-accent-emphasis)] opacity-30 blur-2xl' />
              <Image
                priority={true}
                className='relative h-24 w-24 rounded-full object-cover ring-4 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_30%,transparent)] ring-offset-2 ring-offset-[color:color-mix(in_srgb,var(--color-bg-white)_90%,transparent)] transition-transform duration-500 group-hover:scale-110 md:h-32 md:w-32'
                width={128}
                height={128}
                alt='avatar'
                src={config.avatar}
              />
            </div>

            {/* 文字信息 */}
            <div className='flex min-w-0 flex-1 flex-col gap-y-3'>
              <h1 className='bg-gradient-to-r from-[color:var(--color-fg-accent)] to-[color:var(--color-fg-sponsors)] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl'>
                {config.name}
              </h1>
              <p className='text-fg-muted w-fit overflow-hidden font-mono text-xs font-medium uppercase tracking-wider sm:text-sm'>
                {config.slug}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity区域 - 液态玻璃风格 */}
      <div className='animate-in fade-in slide-in-from-bottom-4 mb-12 duration-700' style={{ animationDelay: '100ms' }}>
        <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.01]'>
          {/* 玻璃背景 */}
          <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_85%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_75%,transparent)]' />

          {/* 顶部光效 */}
          <div className='absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--color-fg-accent)_30%,transparent)] to-transparent' />

          {/* 内容 */}
          <div className='relative p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_6%,transparent)]'>
            <h2 className='text-fg-default mb-6 text-lg font-bold sm:text-xl'>最近在做什么 ⚡️</h2>
            <div className='space-y-4'>
              {activityItems.map((item, index) => (
                <div
                  key={item.label}
                  className='text-fg-muted flex items-center gap-3 text-sm font-medium transition-all duration-300 hover:translate-x-2 hover:text-[color:var(--color-fg-default)]'
                >
                  <span
                    className='h-2.5 w-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-125'
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 文章卡片网格 - 液态玻璃风格 */}
      <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {data.map((post: Article, index) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className='animate-in fade-in slide-in-from-bottom-4 duration-700'
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <div className='group relative h-full overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.03]'>
              {/* 玻璃背景 */}
              <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_85%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_70%,transparent)]' />

              {/* 光晕装饰 */}
              <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--color-bg-accent-emphasis)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20' />

              {/* 内容 */}
              <div className='relative flex h-full flex-col gap-4 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_6%,transparent)]'>
                <h2 className='text-fg-default line-clamp-2 text-lg font-bold transition-colors duration-300 group-hover:text-[color:var(--color-fg-accent)]'>
                  {post.title}
                </h2>

                <div className='mt-auto flex items-center gap-3'>
                  <time className='text-fg-muted flex items-center gap-1.5 text-xs font-medium'>
                    <span className='bg-bg-accent-emphasis h-1.5 w-1.5 animate-pulse rounded-full'></span>
                    {dayjs(post.updatedAt).format('YYYY-MM-DD')}
                  </time>
                  <span className='text-fg-accent flex items-center gap-1 rounded-full bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_15%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_10%,transparent)] px-3 py-1 text-xs font-semibold uppercase ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_20%,transparent)]'>
                    {post.tag}
                  </span>
                </div>

                {/* 悬浮箭头 */}
                <div className='absolute bottom-6 right-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-bg-accent-emphasis)] to-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_80%,var(--color-fg-black))] shadow-lg'>
                    <svg
                      className='h-5 w-5 text-[color:var(--color-fg-onEmphasis)]'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA按钮 - 液态玻璃风格 */}
      <Link
        href='/post'
        className='animate-in fade-in slide-in-from-bottom-4 duration-700'
        style={{ animationDelay: `${200 + data.length * 100}ms` }}
      >
        <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]'>
          {/* 动态光晕背景 */}
          <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_20%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-accent)_15%,transparent)]' />

          {/* 旋转光效 */}
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <div className='h-[200%] w-[200%] animate-spin bg-[conic-gradient(from_180deg,color-mix(in_srgb,var(--color-bg-accent)_30%,transparent),color-mix(in_srgb,var(--color-bg-accent-emphasis)_40%,transparent),transparent_60%)] blur-2xl' style={{ animationDuration: '3s' }}></div>
          </div>

          {/* 内容 */}
          <div className='relative px-10 py-6 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_20%,transparent)]'>
            <span className='text-fg-accent flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider'>
              <span>探索更多</span>
              <svg
                className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2.5}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

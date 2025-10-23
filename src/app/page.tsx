import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
import Image from 'next/image';
import dayjs from 'dayjs';
import type { CSSProperties } from 'react';

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

  const heroVars: CSSProperties = {
    '--hero-surface': 'color-mix(in srgb, var(--bgColor-default) 90%, transparent)',
    '--hero-border': 'color-mix(in srgb, var(--borderColor-accent-emphasis) 45%, transparent)',
    '--hero-shadow':
      '0 36px 68px -44px color-mix(in srgb, var(--fgColor-default) 24%, transparent)',
  };

  const activityVars: CSSProperties = {
    '--activity-surface': 'color-mix(in srgb, var(--bgColor-muted) 78%, transparent)',
    '--activity-border': 'color-mix(in srgb, var(--borderColor-muted) 80%, transparent)',
    '--activity-shadow':
      '0 28px 52px -34px color-mix(in srgb, var(--fgColor-default) 20%, transparent)',
    '--activity-dot-primary': 'var(--bgColor-accent-emphasis)',
    '--activity-dot-secondary': 'color-mix(in srgb, var(--bgColor-accent) 78%, transparent)',
    '--activity-dot-tertiary': 'color-mix(in srgb, var(--bgColor-accent-muted) 92%, transparent)',
  };

  const cardVars: CSSProperties = {
    '--card-surface': 'color-mix(in srgb, var(--bgColor-default) 86%, transparent)',
    '--card-border': 'color-mix(in srgb, var(--borderColor-muted) 75%, transparent)',
    '--card-inner-border': 'color-mix(in srgb, var(--borderColor-muted) 68%, transparent)',
    '--card-shadow': '0 28px 60px -38px color-mix(in srgb, var(--fgColor-default) 22%, transparent)',
    '--card-shadow-hover':
      '0 30px 66px -34px color-mix(in srgb, var(--fgColor-default) 32%, transparent)',
    '--card-overlay':
      'linear-gradient(135deg, color-mix(in srgb, var(--bgColor-accent) 28%, transparent), color-mix(in srgb, var(--bgColor-accent-emphasis) 32%, transparent))',
    '--card-tag': 'color-mix(in srgb, var(--bgColor-accent-muted) 95%, transparent)',
    '--card-tag-border': 'color-mix(in srgb, var(--borderColor-muted) 78%, transparent)',
  };

  const ctaVars: CSSProperties = {
    '--cta-glow':
      'conic-gradient(from 180deg, color-mix(in srgb, var(--bgColor-accent) 35%, transparent), color-mix(in srgb, var(--bgColor-accent-emphasis) 40%, transparent), transparent 75%)',
  };

  const activityItems = [
    {
      label: '正在开发新的个人网站',
      dotClass: 'bg-[color:var(--activity-dot-primary)]',
    },
    {
      label: '学习 Rust 编程语言',
      dotClass: 'bg-[color:var(--activity-dot-secondary)]',
    },
    {
      label: '研究 AI 应用开发',
      dotClass: 'bg-[color:var(--activity-dot-tertiary)]',
    },
  ];

  return (
    <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
      <div className='mb-12 animate-fade-in'>
        <div
          style={heroVars}
          className='flex items-center gap-8 rounded-3xl border border-[color:var(--hero-border)] bg-[color:var(--hero-surface)] p-6 shadow-[var(--hero-shadow)] backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 sm:p-8'
        >
          <Image
            priority={true}
            className='h-24 w-24 rounded-full object-cover ring-4 ring-[color:var(--hero-border)] ring-offset-2 ring-offset-[color:var(--hero-surface)] transition-transform duration-300 hover:scale-105 md:h-32 md:w-32'
            width={128}
            height={128}
            alt='avatar'
            src={config.avatar}
          />
          <div className='flex flex-col gap-y-3'>
            <h1 className='bg-[linear-gradient(120deg,_var(--fgColor-accent),_var(--fgColor-sponsors))] bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl'>
              {config.name}
            </h1>
            <p className='animate-typing w-fit overflow-hidden whitespace-nowrap border-r border-[color:var(--hero-border)] pr-2 font-mono text-xs uppercase tracking-wider text-muted sm:text-sm'>
              {config.slug}
            </p>
          </div>
        </div>
      </div>

      <div
        style={activityVars}
        className='mb-12 rounded-2xl border border-[color:var(--activity-border)] bg-[color:var(--activity-surface)] p-6 shadow-[var(--activity-shadow)] backdrop-blur-md sm:p-8'
      >
        <h2 className='mb-5 text-base font-medium text-default sm:text-lg'>最近在做什么 ⚡️</h2>
        <div className='space-y-4'>
          {activityItems.map((item) => (
            <div key={item.label} className='flex items-center gap-3 text-sm text-muted'>
              <span className={`h-2.5 w-2.5 rounded-full ${item.dotClass}`}></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {data.map((post: Article) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            style={cardVars}
            className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--card-border)] bg-[color:var(--card-surface)] shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]'
          >
            <div className='relative rounded-2xl border border-[color:var(--card-inner-border)] bg-[color:var(--card-surface)] p-6'>
              <div className='absolute inset-0 rounded-2xl bg-[var(--card-overlay)] opacity-70'></div>
              <div className='relative flex flex-col gap-4'>
                <h2 className='line-clamp-2 font-mono text-lg font-medium text-default/90'>
                  {post.title}
                </h2>
                <div className='flex items-center gap-3 text-xs text-muted'>
                  <time className='flex items-center gap-1'>
                    <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-bg-accent-emphasis'></span>
                    {dayjs(post.updatedAt).format('YYYY-MM-DD')}
                  </time>
                  <span className='rounded-md border border-[color:var(--card-tag-border)] bg-[color:var(--card-tag)] px-2 py-0.5 font-mono uppercase tracking-wider text-muted'>
                    {post.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className='absolute inset-0 flex items-center justify-center bg-[var(--card-overlay)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100'>
              <div className='flex items-center gap-2 text-onEmphasis'>
                <span className='font-mono tracking-wider'>VIEW POST</span>
                <span className='animate-pulse'>_</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        style={ctaVars}
        className='group relative mt-12 block overflow-hidden rounded-2xl border border-border-accent-emphasis bg-bg-accent px-10 py-4 text-center transition-transform duration-500 hover:-translate-y-1 sm:mt-16'
        href='/post'
      >
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-70'>
          <div className='h-[380%] w-[220%] animate-spin bg-[var(--cta-glow)] blur-2xl'></div>
        </div>
        <span className='relative flex items-center justify-center gap-2 font-mono text-sm font-medium text-onEmphasis'>
          <span>EXPLORE MORE</span>
          <span className='animate-pulse'>_</span>
        </span>
      </Link>
    </div>
  );
}

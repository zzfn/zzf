import Link from 'next/link';
import dayjs from 'dayjs';
import type { Article } from 'types/article';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <Link
      href={`/post/${article.id}`}
      className='group relative block h-full'
      style={{
        animation: `slide-up 0.5s ease-out ${200 + index * 100}ms both`,
      }}
    >
      <div className='relative h-full overflow-hidden rounded-3xl border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-muted)]/80 backdrop-blur-2xl transition-all duration-500 hover:scale-[1.02] hover:border-[color:var(--color-border-accent-muted)] hover:shadow-2xl'>
        <div className='absolute inset-0 bg-gradient-to-br from-[color:var(--color-bg-accent-muted)]/50 via-transparent to-[color:var(--color-bg-default)]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        <div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-[color:var(--color-bg-accent-emphasis)]/30 via-[color:var(--color-bg-accent)]/10 to-transparent blur-3xl transition-all duration-700 group-hover:scale-150' />
        <div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-[color:var(--color-bg-accent)]/30 via-[color:var(--color-bg-accent-muted)]/10 to-transparent blur-3xl transition-all duration-700 group-hover:scale-150' />

        <div className='absolute inset-0 rounded-3xl bg-gradient-to-tr from-[color:var(--color-bg-default)]/50 via-[color:var(--color-bg-accent-muted)]/20 to-transparent' />
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-muted)] to-transparent' />
        <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-muted)] to-transparent' />
        <div className='absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[color:var(--color-border-muted)] to-transparent' />
        <div className='absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[color:var(--color-border-muted)] to-transparent' />

        <div className='relative flex h-full flex-col p-6'>
          <div className='mb-4 flex items-center gap-3'>
            <span className='rounded-full bg-[color:var(--color-bg-accent-muted)]/60 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-[color:var(--color-fg-accent)] uppercase ring-1 ring-[color:var(--color-border-accent-muted)]/60 backdrop-blur-md'>
              {article.tag}
            </span>
            <div className='h-1 w-1 rounded-full bg-[color:var(--color-border-muted)]' />
            <time className='text-xs text-[color:var(--color-fg-muted)]'>
              {dayjs(article.updatedAt).format('YYYY年MM月DD日')}
            </time>
          </div>

          <h3 className='mb-auto line-clamp-3 text-xl leading-relaxed font-bold text-[color:var(--color-fg-default)] transition-all duration-300 group-hover:text-[color:var(--color-fg-accent)] group-hover:drop-shadow-md'>
            {article.title}
          </h3>

          <div className='mt-6 flex items-center gap-2 text-sm font-medium text-[color:var(--color-fg-muted)] transition-colors duration-300 group-hover:text-[color:var(--color-fg-accent)]'>
            <span>阅读全文</span>
            <svg
              className='h-4 w-4 -translate-x-1 opacity-60 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2.5}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

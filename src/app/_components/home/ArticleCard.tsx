import Link from 'next/link';
import dayjs from 'dayjs';
import type { Article } from 'types/article';
import { GlassCard } from '@/components/ui';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <Link href={`/post/${article.id}`}>
      <GlassCard
        showAnimation
        hoverScale="1.03"
        showGlow
        glowPosition="top-right"
        animationDelay={200 + index * 100}
        gradientFrom="from-[color:color-mix(in_srgb,var(--color-bg-default)_85%,transparent)]"
        gradientTo="to-[color:color-mix(in_srgb,var(--color-bg-muted)_70%,transparent)]"
        contentClassName="flex h-full flex-col gap-4 p-6"
      >
        <h2 className='text-fg-default line-clamp-2 text-lg font-bold transition-colors duration-300 group-hover:text-[color:var(--color-fg-accent)]'>
          {article.title}
        </h2>

        <div className='mt-auto flex items-center gap-3'>
          <time className='text-fg-muted flex items-center gap-1.5 text-xs font-medium'>
            <span className='bg-bg-accent-emphasis h-1.5 w-1.5 animate-pulse rounded-full'></span>
            {dayjs(article.updatedAt).format('YYYY-MM-DD')}
          </time>
          <span className='text-fg-accent flex items-center gap-1 rounded-full bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_15%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_10%,transparent)] px-3 py-1 text-xs font-semibold uppercase ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_20%,transparent)]'>
            {article.tag}
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
      </GlassCard>
    </Link>
  );
}

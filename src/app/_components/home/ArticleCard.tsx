'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import type { Article } from 'types/article';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.06,
        ease: 'easeOut',
      }}
    >
      <Link href={`/post/${article.id}`} className='group block h-full'>
        <div className='border-jan-ink bg-bg-default group-hover:border-jan-ink relative h-full overflow-hidden rounded-2xl border-2 p-6 shadow-[3px_3px_0_var(--color-jan-ink)] transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
          {/* 标签和日期 */}
          <div className='relative mb-4 flex items-center gap-3'>
            <span className='border-border-muted bg-jan-yellow-bg text-fg-muted inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase'>
              {article.tag}
            </span>
            <div className='bg-border-muted h-1 w-1 rounded-full' />
            <time className='text-fg-muted flex items-center gap-1.5 text-xs'>
              {dayjs(article.updatedAt).format('MM/DD')}
            </time>
          </div>

          {/* 标题 */}
          <h3 className='text-fg-default group-hover:text-fg-accent relative mb-auto line-clamp-3 text-xl leading-relaxed font-semibold transition-colors duration-200'>
            {article.title}
          </h3>

          {/* 阅读更多 */}
          <div className='mt-6'>
            <span className='text-fg-muted group-hover:text-fg-accent inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200'>
              阅读全文
              <span className='transition-transform duration-200 group-hover:-translate-y-0.5'>
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

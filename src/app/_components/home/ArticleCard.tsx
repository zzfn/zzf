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
        <div className='border-border-muted bg-bg-default group-hover:border-border-default relative h-full overflow-hidden rounded-lg border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-[160ms] ease-out group-hover:translate-x-1 group-hover:rounded-none group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
          {/* 标签和日期 */}
          <div className='relative mb-4 flex items-center gap-3'>
            <span className='border-border-muted text-fg-muted inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase'>
              {article.tag}
            </span>
            <div className='bg-border-muted h-1 w-1 rounded-full' />
            <time className='text-fg-muted flex items-center gap-1.5 text-xs'>
              {dayjs(article.updatedAt).format('MM/DD')}
            </time>
          </div>

          {/* 标题 */}
          <h3 className='text-fg-default group-hover:text-fg-accent relative mb-auto line-clamp-3 text-xl leading-relaxed font-semibold transition-colors duration-[160ms]'>
            {article.title}
          </h3>

          {/* 阅读更多 */}
          <div className='mt-6'>
            <span className='text-fg-muted group-hover:text-fg-accent inline-flex items-center gap-2 text-sm font-medium transition-colors duration-[160ms]'>
              阅读全文
              <span className='transition-transform duration-[160ms] group-hover:translate-x-1'>
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Tag, Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { Article } from 'types/article';

interface BentoRecentGridProps {
  articles: Article[];
}

export function BentoRecentGrid({ articles }: BentoRecentGridProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between px-1'>
        <h3 className='flex items-center gap-2 text-base font-bold text-fg-default'>
          <BookOpen size={16} className='text-fg-accent' />
          <span>最新文章 · Recent Stories</span>
        </h3>
        <Link
          href='/post'
          className='group flex items-center gap-1 text-xs font-semibold text-fg-muted transition-colors hover:text-fg-default'
        >
          <span>查看全部</span>
          <ArrowRight
            size={13}
            className='transition-transform duration-200 group-hover:translate-x-0.5'
          />
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2 + index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link href={`/post/${article.id}`} className='group block h-full'>
              <div className='bento-card relative flex h-full flex-col justify-between p-5 transition-all duration-200 hover:-translate-y-1 sm:p-6'>
                <div>
                  {/* 标签与日期 */}
                  <div className='mb-3 flex items-center gap-2.5 text-[11px]'>
                    <span className='inline-flex items-center gap-1 rounded-full border border-border-muted/70 bg-bg-muted/40 px-2 py-0.5 font-medium text-fg-muted'>
                      <Tag size={10} />
                      <span>{article.tag}</span>
                    </span>
                    <span className='h-1 w-1 rounded-full bg-border-muted' />
                    <time className='flex items-center gap-1 font-mono text-fg-muted text-[11px]'>
                      <Clock size={10} />
                      {dayjs(article.createdAt || article.updatedAt).format('MM/DD')}
                    </time>
                  </div>

                  {/* 标题 */}
                  <h4 className='line-clamp-2 text-base font-semibold leading-snug text-fg-default transition-colors duration-200 group-hover:text-fg-accent sm:text-lg'>
                    {article.title}
                  </h4>
                </div>

                {/* 底部阅读更多 */}
                <div className='mt-4 flex items-center justify-between border-t border-border-muted/40 pt-3 text-xs font-medium text-fg-muted'>
                  <span>阅读全文</span>
                  <ArrowRight
                    size={13}
                    className='transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg-accent'
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

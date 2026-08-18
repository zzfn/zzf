'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, Tag } from 'lucide-react';
import type { Article } from 'types/article';

interface BentoFeaturedPostProps {
  article: Article;
}

export function BentoFeaturedPost({ article }: BentoFeaturedPostProps) {
  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      className='group bento-card relative overflow-hidden p-6 sm:p-8'
    >
      {/* 渐变装饰微光 */}
      <div className='pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-gradient-to-tl from-indigo-500/10 via-teal-500/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:from-indigo-500/20' />

      <Link href={`/post/${article.id}`} className='relative flex h-full flex-col justify-between'>
        <div>
          {/* 顶部标签栏 */}
          <div className='mb-4 flex flex-wrap items-center gap-2.5 text-xs'>
            <span className='inline-flex items-center gap-1 rounded-full bg-fg-default px-3 py-1 font-medium text-bg-default shadow-xs'>
              <Sparkles size={12} />
              <span>最新精选</span>
            </span>

            <span className='inline-flex items-center gap-1 rounded-full border border-border-muted/70 bg-bg-muted/40 px-2.5 py-0.5 font-medium text-fg-muted'>
              <Tag size={11} />
              <span>{article.tag}</span>
            </span>

            <span className='inline-flex items-center gap-1 text-fg-muted font-mono text-[11px]'>
              <Clock size={11} />
              <time>{dayjs(article.createdAt || article.updatedAt).format('YYYY-MM-DD')}</time>
            </span>
          </div>

          {/* 文章标题 */}
          <h2 className='mb-3 text-xl font-bold tracking-tight text-fg-default transition-colors duration-200 group-hover:text-fg-accent sm:text-2xl lg:text-3xl'>
            {article.title}
          </h2>

          {/* 文章摘要/导读 */}
          {article.summary && (
            <p className='line-clamp-2 text-sm text-fg-muted leading-relaxed sm:text-base'>
              {article.summary}
            </p>
          )}
        </div>

        {/* 底部阅读更多引导 */}
        <div className='mt-6 flex items-center justify-between border-t border-border-muted/50 pt-4 text-xs font-medium text-fg-muted'>
          <span className='font-mono'>~5 min read</span>
          <span className='inline-flex items-center gap-1 text-fg-default font-semibold transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg-accent'>
            阅读全文
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

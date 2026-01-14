'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import type { Article } from 'types/article';

interface ArticleCardProps {
  article: Article;
  index: number;
}

// 预定义的鲜艳渐变色调色板
const vibrantGradients = [
  { from: 'from-violet-500', to: 'to-purple-600', light: 'violet' },
  { from: 'from-rose-500', to: 'to-pink-600', light: 'rose' },
  { from: 'from-cyan-500', to: 'to-blue-600', light: 'cyan' },
  { from: 'from-emerald-500', to: 'to-teal-600', light: 'emerald' },
  { from: 'from-amber-500', to: 'to-orange-600', light: 'amber' },
  { from: 'from-fuchsia-500', to: 'to-pink-600', light: 'fuchsia' },
];

// Claymorphism 样式
const clayStyle = {
  boxShadow: `
    8px 8px 16px color-mix(in srgb, var(--fgColor-default) 8%, transparent),
    -4px -4px 12px color-mix(in srgb, var(--bgColor-default) 80%, white),
    inset 1px 1px 2px color-mix(in srgb, var(--bgColor-default) 50%, white),
    inset -1px -1px 2px color-mix(in srgb, var(--fgColor-default) 5%, transparent)
  `,
};

export function ArticleCard({ article, index }: ArticleCardProps) {
  const gradient = vibrantGradients[index % vibrantGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link href={`/post/${article.id}`} className='group block h-full'>
        <motion.div
          className='bg-bg-muted relative h-full overflow-hidden rounded-3xl p-6'
          style={clayStyle}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* 装饰性色块 - 右上角 */}
          <div
            className={`absolute -top-8 -right-8 h-24 w-24 rounded-2xl bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-20 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-40`}
          />

          {/* 标签和日期 */}
          <div className='relative mb-4 flex items-center gap-3'>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg`}
            >
              <span className='text-xs'>📌</span>
              {article.tag}
            </span>
            <div className='bg-border-muted h-1 w-1 rounded-full' />
            <time className='text-fg-muted flex items-center gap-1.5 text-xs'>
              <span>📅</span>
              {dayjs(article.updatedAt).format('MM/DD')}
            </time>
          </div>

          {/* 标题 */}
          <h3 className='text-fg-default group-hover:text-fg-accent relative mb-auto line-clamp-3 text-xl leading-relaxed font-bold transition-colors duration-300'>
            {article.title}
          </h3>

          {/* 阅读更多按钮 */}
          <div className='mt-6'>
            <motion.div
              className='inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium'
              style={{
                boxShadow: `
                  inset 4px 4px 8px color-mix(in srgb, var(--fgColor-default) 6%, transparent),
                  inset -2px -2px 6px color-mix(in srgb, var(--bgColor-default) 60%, white)
                `,
              }}
              whileHover={{ x: 4 }}
            >
              <span className='text-fg-muted group-hover:text-fg-accent transition-colors'>
                阅读全文
              </span>
              <motion.span className='text-base' initial={{ x: 0 }} whileHover={{ x: 4 }}>
                →
              </motion.span>
            </motion.div>
          </div>

          {/* 底部装饰线 */}
          <div
            className={`absolute right-6 bottom-0 left-6 h-1 rounded-full bg-gradient-to-r ${gradient.from} ${gradient.to} opacity-0 transition-opacity duration-300 group-hover:opacity-60`}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

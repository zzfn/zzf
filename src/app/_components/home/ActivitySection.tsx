'use client';

import { motion } from 'framer-motion';

interface ActivityItem {
  label: string;
  color: string;
  emoji?: string;
}

interface ActivitySectionProps {
  items: ActivityItem[];
}

// Claymorphism 样式
const clayStyle = {
  boxShadow: `
    8px 8px 16px color-mix(in srgb, var(--fgColor-default) 8%, transparent),
    -4px -4px 12px color-mix(in srgb, var(--bgColor-default) 80%, white),
    inset 1px 1px 2px color-mix(in srgb, var(--bgColor-default) 50%, white),
    inset -1px -1px 2px color-mix(in srgb, var(--fgColor-default) 5%, transparent)
  `,
};

const clayInsetStyle = {
  boxShadow: `
    inset 4px 4px 8px color-mix(in srgb, var(--fgColor-default) 6%, transparent),
    inset -2px -2px 6px color-mix(in srgb, var(--bgColor-default) 60%, white)
  `,
};

// 默认 emoji 列表
const defaultEmojis = ['🚀', '📚', '🤖', '⚡', '🎨', '🔧'];

export function ActivitySection({ items }: ActivitySectionProps) {
  return (
    <motion.div
      className='mb-12'
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className='bg-bg-muted relative overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.01]'
        style={clayStyle}
      >
        {/* 装饰色块 */}
        <div className='absolute top-4 -right-8 h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-15 blur-xl' />

        <h2 className='text-fg-default mb-6 flex items-center gap-3 text-lg font-bold sm:text-xl'>
          <span className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-sm text-white shadow-lg'>
            ⚡
          </span>
          最近在做什么
        </h2>

        <div className='space-y-3'>
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className='flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200'
              style={clayInsetStyle}
              whileHover={{ x: 6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className='text-base'>
                {item.emoji || defaultEmojis[index % defaultEmojis.length]}
              </span>
              <span className='text-fg-muted text-sm font-medium'>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

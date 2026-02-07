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

const defaultEmojis = ['🚀', '📚', '🤖', '⚡', '🎨', '🔧'];

export function ActivitySection({ items }: ActivitySectionProps) {
  return (
    <motion.div
      className='mb-12'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
    >
      <div className='border-border-muted bg-bg-default hover:border-border-default relative overflow-hidden rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-[160ms] ease-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
        <div className='p-8'>
          <h2 className='text-fg-default mb-6 flex items-center gap-3 text-lg font-semibold sm:text-xl'>
            ⚡ 最近在做什么
          </h2>
        </div>

        <div>
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className='border-border-muted hover:bg-bg-muted flex items-center gap-3 border-t px-8 py-4 transition-all duration-[160ms] ease-out hover:translate-x-1'
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

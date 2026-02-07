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
      <div className='border-jan-ink bg-jan-purple-bg hover:border-jan-ink relative overflow-hidden rounded-3xl border-2 shadow-[3px_3px_0_var(--color-jan-ink)] transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
        <div className='p-8'>
          <h2 className='text-fg-default mb-6 flex items-center gap-3 text-lg font-semibold sm:text-xl'>
            ⚡ 最近在做什么
          </h2>
        </div>

        <div>
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className='border-border-muted hover:bg-jan-purple/10 flex items-center gap-3 border-t px-8 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5'
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

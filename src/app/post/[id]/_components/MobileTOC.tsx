'use client';

import { useState } from 'react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { ListFilter, X, AlignLeft, ArrowUp } from 'lucide-react';
import { getTitle } from 'utils/translateMarkdown';

interface MobileTOCProps {
  source: string;
}

export function MobileTOC({ source }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowButton(latest > 300);
  });

  const headings = getTitle(source)?.map((r, index) => ({
    index,
    level: r.match(/^#+/g)?.[0].length || 0,
    text: r.replace(/#+\s(\S+)\n*/g, '$1'),
  })) || [];

  if (headings.length === 0) return null;

  return (
    <div className='md:hidden'>
      {/* 右下角浮动胶囊小按钮 */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label='打开目录'
            className='bento-card fixed bottom-6 right-6 z-40 flex h-12 items-center gap-1.5 rounded-full px-3.5 shadow-lg border border-border-muted/80 bg-bg-default/90 backdrop-blur-md cursor-pointer'
          >
            <ListFilter size={16} className='text-fg-accent' />
            <span className='font-mono text-xs font-semibold text-fg-default'>{progress}%</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 底部滑出的毛玻璃目录抽屉 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center'
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className='bento-card w-full max-h-[75vh] rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4 border-b-0 dark:bg-zinc-950/95'
            >
              <div className='flex items-center justify-between border-b border-border-muted/50 pb-3'>
                <div className='flex items-center gap-2 text-sm font-bold text-fg-default'>
                  <AlignLeft size={16} className='text-fg-accent' />
                  <span>目录导航</span>
                  <span className='font-mono text-xs font-normal text-fg-muted'>({progress}% 已读)</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className='rounded-full p-1 text-fg-muted hover:bg-bg-muted/70'
                >
                  <X size={18} />
                </button>
              </div>

              {/* 目录项列表 */}
              <ul className='overflow-y-auto space-y-1.5 py-1 text-sm'>
                {headings.map((item) => (
                  <li
                    key={item.index}
                    style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 12)}px` }}
                  >
                    <a
                      href={`#${item.text}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(item.text);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setIsOpen(false);
                        }
                      }}
                      className='block truncate rounded-xl px-3 py-2 text-fg-muted active:bg-fg-accent/10 active:text-fg-accent transition-colors'
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>

              {/* 快速回到顶部 */}
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className='flex items-center justify-center gap-2 rounded-xl border border-border-muted/50 bg-bg-muted/30 py-2.5 text-xs font-medium text-fg-default hover:bg-bg-muted'
              >
                <ArrowUp size={14} />
                <span>回到顶部</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

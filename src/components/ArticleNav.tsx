'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getTitle } from 'utils/translateMarkdown';
import classNames from 'classnames';
import { AnimatePresence, useMotionValueEvent, useScroll, motion } from 'framer-motion';

interface NavData {
  index: number;
  level: number;
  text: string;
}

interface NavProps {
  source: string;
}

const ArticleNav: React.FC<NavProps> = ({ source }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const [list, setList] = useState<NavData[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const { scrollYProgress } = useScroll();
  const ulRef = useRef<HTMLUListElement>(null);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollY(latest);
  });

  useEffect(() => {
    setCurrent(window.location.hash.replace('#', ''));
    const matchResult = getTitle(source);
    if (matchResult) {
      const navData: NavData[] = matchResult.map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)?.[0].length || 0,
        text: r.replace(/#+\s(\S+)\n*/g, '$1'),
      }));
      setList(navData);
    }
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.target.getAttribute('id')) {
            const curr = entry.target.getAttribute('id');
            if (curr) {
              setCurrent(curr);
            }
          }
        });
      },
      {
        rootMargin: '-30px 0px -30px 0px',
        threshold: 0.5,
      },
    );
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (ele) {
      navObserver.observe(ele);
    });
  }, [source]);

  return (
    <div className='sticky top-20'>
      <motion.div
        className={classNames('right-4 z-50 md:relative md:right-0', 'transition-all duration-300')}
        animate={{ width: isExpanded ? '240px' : '40px' }}
      >
        <motion.div
          className={classNames(
            'border-accent-emphasis/10 bg-default/80 rounded-xl border backdrop-blur-sm',
            'overflow-hidden transition-all duration-300',
          )}
          animate={{
            width: isExpanded ? '240px' : '80px',
            height: isExpanded ? 'auto' : '40px',
          }}
        >
          {/* 进度指示器和展开按钮 */}
          <div
            className={classNames(
              'relative flex h-10 items-center justify-center',
              'border-accent-emphasis/10 cursor-pointer border-b',
              'font-mono text-sm text-accent-emphasis',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className='absolute inset-0'>
              <div
                className='bg-accent-emphasis/5 h-full transition-all'
                style={{ width: `${Math.floor(scrollY * 100)}%` }}
              />
            </div>
            <span className='relative'>{Math.floor(scrollY * 100)}%</span>
            <motion.div className='absolute right-2' animate={{ rotate: isExpanded ? 180 : 0 }}>
              ▼
            </motion.div>
          </div>

          {/* 导航列表 */}
          <motion.ul
            ref={ulRef}
            className={classNames(
              'relative max-h-[70vh] overflow-y-auto py-2',
              'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent-emphasis/20',
            )}
            animate={{ opacity: isExpanded ? 1 : 0 }}
          >
            <AnimatePresence>
              {hoveredIndex !== null && isExpanded && (
                <motion.div
                  className='bg-accent-emphasis/5 absolute left-0 -z-[1] rounded-lg'
                  initial={{ top: position.top, height: position.height, opacity: 0 }}
                  animate={{ top: position.top, height: position.height, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ width: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                />
              )}
            </AnimatePresence>

            {list.map((nav, index) => (
              <motion.li
                key={nav.index}
                onMouseEnter={(e) => {
                  if (!isExpanded) return;
                  setHoveredIndex(index);
                  const liRect = e.currentTarget.getBoundingClientRect();
                  const ulRect = ulRef.current!.getBoundingClientRect();
                  setPosition({
                    top: liRect.top - ulRect.top + ulRef.current!.scrollTop,
                    height: liRect.height,
                  });
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={classNames(
                  'group relative px-3 py-1.5',
                  'transition-all duration-200',
                  current === nav.text && 'text-accent-emphasis',
                )}
                style={{
                  marginLeft: isExpanded ? `${(nav.level - 1) * 10}px` : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <a
                  href={`#${nav.text}`}
                  onClick={() => setCurrent(nav.text)}
                  className={classNames(
                    'block truncate text-sm text-muted',
                    'transition-colors duration-200',
                    'hover:text-accent-emphasis',
                    current === nav.text && 'text-accent-emphasis',
                  )}
                >
                  {nav.text}
                </a>
                {current === nav.text && (
                  <motion.div
                    className='absolute left-0 top-0 h-full w-0.5 bg-accent-emphasis'
                    layoutId='activeIndicator'
                  />
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArticleNav;

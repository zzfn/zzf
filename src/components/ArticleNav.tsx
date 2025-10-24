'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const ArticleNav = ({ source }: NavProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const [current, setCurrent] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '',
  );
  const [scrollY, setScrollY] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const { scrollYProgress } = useScroll();
  const ulRef = useRef<HTMLUListElement>(null);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollY(latest);
  });

  const list = useMemo<NavData[]>(() => {
    const matchResult = getTitle(source);
    if (!matchResult) {
      return [];
    }
    return matchResult.map((r, index) => ({
      index,
      level: r.match(/^#+/g)?.[0].length || 0,
      text: r.replace(/#+\s(\S+)\n*/g, '$1'),
    }));
  }, [source]);

  useEffect(() => {
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
    const headings = Array.from(document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6'));
    headings.forEach((ele) => {
      navObserver.observe(ele);
    });

    return () => {
      navObserver.disconnect();
    };
  }, [source]);

  return (
    <div className='sticky top-20'>
      <motion.div
        className={classNames('right-4 z-50 md:relative md:right-0', 'transition-all duration-300')}
        animate={{ width: isExpanded ? '240px' : '40px' }}
      >
        <motion.div
          className={classNames(
            'border-border-accent-emphasis/10 bg-bg-default/80 rounded-xl border backdrop-blur-sm',
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
              'border-border-accent-emphasis/10 cursor-pointer border-b',
              'text-fg-accent font-mono text-sm',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className='absolute inset-0'>
              <div
                className='bg-bg-accent-emphasis/5 h-full transition-all'
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
                  className='bg-bg-accent-emphasis/5 absolute left-0 -z-[1] rounded-lg'
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
                  const ulElement = ulRef.current;
                  if (!ulElement) return;
                  const ulRect = ulElement.getBoundingClientRect();
                  setPosition({
                    top: liRect.top - ulRect.top + ulElement.scrollTop,
                    height: liRect.height,
                  });
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={classNames(
                  'group relative px-3 py-1.5',
                  'transition-all duration-200',
                  current === nav.text && 'text-fg-accent',
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
                    'text-fg-muted block truncate text-sm',
                    'transition-colors duration-200',
                    'hover:text-fg-accent',
                    current === nav.text && 'text-fg-accent',
                  )}
                >
                  {nav.text}
                </a>
                {current === nav.text && (
                  <motion.div
                    className='bg-bg-accent-emphasis absolute top-0 left-0 h-full w-0.5'
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

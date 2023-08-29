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
    <div className={classNames('transform-gpu hidden md:block  h-full w-36')}>
      <ul ref={ulRef} className={classNames('sticky top-20 py-2 text-sm')}>
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className='bg-muted -z-[1] rounded-2xl'
              initial={{ top: position.top, height: position.height }}
              animate={{ top: position.top, height: position.height }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            />
          )}
        </AnimatePresence>
        <li className='pl-3'>{Math.floor(scrollY * 100)}%</li>
        {list.map((nav, index) => (
          <li
            onMouseEnter={(e) => {
              setHoveredIndex(index);
              const liRect = e.currentTarget.getBoundingClientRect();
              const ulRect = ulRef.current!.getBoundingClientRect();
              setPosition({
                top: liRect.top - ulRect.top + ulRef.current!.scrollTop,
                height: liRect.height,
              });
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-current={current === `heading-${nav.index}`}
            title={nav.text}
            onClick={() => {
              setCurrent(`heading-${nav.index}`);
            }}
            className={classNames(
              current === `heading-${nav.index}` && 'text-accent',
              'truncate',
            )}
            style={{ marginLeft: `${(nav.level - 1) * 10}px` }}
            key={nav.index}
          >
            <a href={`#heading-${nav.index}`}># {nav.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleNav;

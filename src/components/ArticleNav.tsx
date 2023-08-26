'use client';
import React, { useEffect, useState } from 'react';
import { getTitle } from 'utils/translateMarkdown';
import classNames from 'classnames';
import { useMotionValueEvent, useScroll, useSpring } from 'framer-motion';

interface NavProps {
  source: string;
}

const ArticleNav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState<any[]>([]);
  const [current, setCurrent] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollY(latest);
  });
  useEffect(() => {
    setCurrent(window.location.hash.replace('#', ''));
    const matchResult = getTitle(source);
    if (matchResult) {
      const navData = matchResult.map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)?.[0].length,
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
      <ul className={classNames('sticky top-20 py-2 text-sm')}>
        <li className='pl-3'>{Math.floor(scrollY * 100)}%</li>
        {list.map((nav) => (
          <li
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

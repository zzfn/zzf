'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTitle } from 'utils/translateMarkdown';
import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUp, AlignLeft } from 'lucide-react';

interface NavData {
  index: number;
  level: number;
  text: string;
}

interface NavProps {
  source: string;
}

const ArticleNav = ({ source }: NavProps) => {
  const [current, setCurrent] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '',
  );
  const [scrollY, setScrollY] = useState<number>(0);
  const { scrollYProgress } = useScroll();

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.getAttribute('id')) {
            const curr = entry.target.getAttribute('id');
            if (curr) {
              setCurrent(curr);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent = Math.min(100, Math.max(0, Math.round(scrollY * 100)));

  return (
    <div className='flex flex-col gap-4'>
      {/* 顶部阅读进度条指示 */}
      <div className='flex items-center justify-between border-b border-border-muted/50 pb-3'>
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg-muted'>
          <AlignLeft size={14} className='text-fg-accent' />
          <span>目录导航</span>
        </div>
        <div className='flex items-center gap-1.5 font-mono text-xs font-medium text-fg-default'>
          <span>{progressPercent}%</span>
          <span className='text-[10px] text-fg-muted'>READ</span>
        </div>
      </div>

      {/* 线性平滑进度条 */}
      <div className='h-1 w-full overflow-hidden rounded-full bg-bg-muted'>
        <div
          className='h-full bg-fg-accent transition-all duration-150 ease-out'
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 目录列表 */}
      {list.length > 0 ? (
        <ul className='max-h-[60vh] space-y-1 overflow-y-auto py-1 pr-1 text-xs'>
          {list.map((nav) => {
            const isActive = current === nav.text;
            return (
              <li
                key={nav.index}
                style={{
                  paddingLeft: `${Math.max(0, (nav.level - 2) * 12)}px`,
                }}
              >
                <a
                  href={`#${nav.text}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(nav.text);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setCurrent(nav.text);
                    }
                  }}
                  className={classNames(
                    'block truncate rounded-lg px-2.5 py-1.5 transition-all duration-150',
                    isActive
                      ? 'bg-fg-default/8 text-fg-accent font-semibold border-l-2 border-fg-accent'
                      : 'text-fg-muted hover:bg-bg-muted/60 hover:text-fg-default',
                  )}
                  title={nav.text}
                >
                  {nav.text}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className='text-xs text-fg-muted py-2'>正文未包含层级目录</p>
      )}

      {/* 回到顶部按钮 */}
      <button
        onClick={scrollToTop}
        className='group mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-border-muted/50 bg-bg-muted/30 py-2 text-xs text-fg-muted transition-all hover:bg-bg-muted hover:text-fg-default cursor-pointer'
      >
        <ArrowUp size={13} className='transition-transform group-hover:-translate-y-0.5' />
        <span>回到顶部</span>
      </button>
    </div>
  );
};

export default ArticleNav;

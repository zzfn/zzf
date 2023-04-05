import React, { useEffect, useState } from 'react';
import { getTitle } from 'utils/translateMarkdown';
import classNames from 'classnames';
import { css } from '@emotion/css';

interface NavProps {
  source: string;
}

const ArticleNav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState<any[]>([]);
  const [current, setCurrent] = useState('');
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
          if (entry.isIntersecting&&entry.target.getAttribute('id')) {
            const curr = entry.target.getAttribute('id')
            if(curr){
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
    <div className={classNames('transform-gpu hidden md:block  h-full col-span-1')}>
      <ul
        className={classNames(
          'sticky top-16',
          css`
            [aria-current='true'] {
              transition-duration: 500ms, 200ms;
              transition-property: transform, opacity, height;
              transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
              color: var(--md-sys-color-on-secondary-container);
              border-color: var(--md-sys-color-utility-outline);
            }
          `,
        )}
      >
        {list.map((nav) => (
          <li
            aria-current={current === `heading-${nav.index}`}
            title={nav.text}
            onClick={() => {
              setCurrent(`heading-${nav.index}`);
            }}
            className={classNames(
              'truncate',
              'text-sm',
              css({
                '&:hover': {
                  backgroundColor: 'rgba(68, 71, 70, 0.08)',
                },
                borderRadius: '18px',
                padding: '8px 16px',
                border: '1px solid transparent',
              }),
            )}
            style={{ marginLeft: `${(nav.level - 1) * 10}px` }}
            key={nav.index}
          >
            <a
              className={css`
                display: block;
                width: 100%;
                height: 100%;
              `}
              href={`#heading-${nav.index}`}
            >
              # {nav.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleNav;

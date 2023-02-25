import React, { useEffect, useState } from 'react';
import { getTitle } from 'utils/translateMarkdown';
import classNames from 'classnames';
import { Card } from '@oc/design';

interface NavProps {
  source: string;
}

const ArticleNav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');
  useEffect(() => {
    setCurrent(window.location.hash.replace('#', ''));
    const matchResult = getTitle(source);
    if (matchResult) {
      const navData = matchResult.map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)[0].length,
        text: r.replace(/#+\s(\S+)\n*/g, '$1'),
      }));
      setList(navData);
    }
    const navObserver = new IntersectionObserver(function (entries) {
      entries.reverse().forEach(function (entry) {
        if (entry.isIntersecting) {
          setCurrent(entry.target.getAttribute('id'));
        }
      });
    });
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (ele) {
      navObserver.observe(ele);
    });
  }, [source]);
  return (
    <ul className={classNames('fixed', 'top-16', '-translate-x-full transform-gpu pr-3 pt-3 hidden md:block')}>
      {list.map((nav) => (
        <li
          onClick={() => {
            setCurrent(`heading-${nav.index}`);
          }}
          className={classNames(
            current === `heading-${nav.index}` && 'text-[var(--accent)]',
            'truncate',
            'text-sm',
          )}
          style={{ marginLeft: `${(nav.level - 1) * 10}px` }}
          key={nav.index}
        >
          <a href={`#heading-${nav.index}`}># {nav.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default ArticleNav;

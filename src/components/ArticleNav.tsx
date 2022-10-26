import React, { useEffect, useState } from 'react';
import { Markdown } from '@zzf/toolkit';
import classNames from 'classnames';

interface NavProps {
  source: string;
}

const ArticleNav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');
  useEffect(() => {
    setCurrent(window.location.hash.replace('#', ''));
    const matchResult = Markdown.getTitle(source);
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
    <ul className={classNames( 'sticky', 'top-16')}>
      {list.map((nav) => (
        <li
          onClick={() => {
            setCurrent(`heading-${nav.index}`);
          }}
          className={classNames(
              current === `heading-${nav.index}`&&'asdsa',
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

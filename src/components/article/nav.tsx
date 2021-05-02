import React, { useEffect, useState } from 'react';
import { Markdown } from '@zzf/toolkit';
import styles from './nav.module.scss';
interface NavProps {
  source: string;
}
const Nav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');
  useEffect(() => {
    window.onhashchange = function () {
      setCurrent(window.location.hash.replace('#', ''));
    };
    const matchResult = Markdown.getTitle(source);
    if (matchResult) {
      const navData = matchResult.map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)[0].length,
        text: r.replace(/#+\s(\S+)\n*/g, '$1'),
      }));
      setList(navData);
      const zxxObserver = new IntersectionObserver(function (entries) {
        entries.reverse().forEach(function (entry) {
          if (entry.isIntersecting) {
            setCurrent(entry.target.getAttribute('data-id'));
          } else {
            console.log(entry.target);
            // console.log(entry.target.getAttribute('data-id'));
          }
        });
      });
      // 观察标题元素
      document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (ele, idx) {
        if (idx) {
          ele.setAttribute('data-id', 'heading-' + (idx - 1));
          zxxObserver.observe(ele);
        }
      });
      const hash = window.location.hash;
      if (hash) {
        const e = document.querySelector(`[data-id = ${hash.replace('#', '')}]`);
        e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setCurrent(hash.replace('#', ''));
      }
    }
  }, []);
  return (
    <ul className={styles.nav}>
      {list.map((nav) => (
        <li
          onClick={() => {
            window.location.hash = `heading-${nav.index}`;
            const e = document.querySelector(`[data-id = heading-${nav.index}]`);
            e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            setCurrent(`heading-${nav.index}`);
          }}
          className={`${styles.navItem} ${current === 'heading-' + nav.index ? styles.active : ''}`}
          style={{ marginLeft: `${(nav.level - 1) * 10}px` }}
          key={nav.index}
        >
          {nav.text}
        </li>
      ))}
    </ul>
  );
};

export default Nav;

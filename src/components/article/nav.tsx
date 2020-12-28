import React, { useEffect, useState } from 'react';
import getTitle from 'md-match';
interface NavProps {
  source: string;
}
const Nav: React.FC<NavProps> = ({ source }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const matchResult = getTitle(source);
    if (matchResult) {
      const navData = matchResult.map((r, i) => ({
        index: i,
        level: r.match(/^#+/g)[0].length,
        text: r.replace(/#+\s(\S+)\n*/g, '$1'),
      }));
      setList(navData);
      const zxxObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            console.log(entry.target.getAttribute('data-id'));
          } else {
            console.log(entry.target.getAttribute('data-id'));
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
      const e = document.querySelector(`[data-id = ${hash.replace('#', '')}]`);
      e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }, []);
  return (
    <ul style={{ position: 'fixed', top: '80px' }}>
      {list.map((nav) => (
        <li
          onClick={() => {
            window.location.hash = `heading-${nav.index}`;
            const e = document.querySelector(`[data-id = heading-${nav.index}]`);
            e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }}
          style={{ marginLeft: `${nav.level * 10}px`, border: '1px solid #ccc' }}
          key={nav.index}
        >
          {nav.text}
        </li>
      ))}
    </ul>
  );
};

export default Nav;

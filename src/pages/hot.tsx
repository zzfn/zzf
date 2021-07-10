import React, { useEffect, useState } from 'react';
import { Card } from '@zzf/design';
import styles from '../styles/hot.module.scss';
import Link from 'next/link';
import { getHot } from 'api/hot';

export default function Hot(): JSX.Element {
  const [list, setList] = useState([]);

  async function handleGet() {
    setList(await getHot());
  }

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div>
      <Card>
        <ul>
          {list.map((n, idx) => (
            <li className={styles.title} key={idx}>
              <Link prefetch={false} href={`https://s.weibo.com${n.href}`}>
                <a className={styles.item} target={'_blank'}>
                  <span className={styles.hot}>{n.idx}</span>
                  {n.title}
                  <span className={styles.num}>{n.num}</span>
                  <span className={styles.tag}>{n.tag}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import Search from '../search/Search';
import { useRouter } from 'next/router';
import useLg from 'hooks/useLg';

function Header(): JSX.Element {
  const router = useRouter();
  const isLg = useLg();
  return (
    <div className={styles.header}>
      <Image
        onClick={() => router.push('/')}
        className={styles.img}
        height={60}
        width={150}
        layout={'intrinsic'}
        src={'/static/img/logo.png'}
      />
      {isLg ? (
        <ul>
          <li>
            <Link href={'/'}>首页</Link>
          </li>
          <li>
            <Link href={'/archive'}>归档</Link>
          </li>
          <li>
            <Link href={'/tag'}>标签</Link>
          </li>
          <li>
            <Link href={'/about'}>关于</Link>
          </li>
          <li>
            <Search>
              <a style={{ cursor: 'pointer' }}>🔍搜索</a>
            </Search>
          </li>
        </ul>
      ) : (
        <Image height={60} width={60} layout={'intrinsic'} src={'/static/img/menu.png'} />
      )}
    </div>
  );
}

export default Header;

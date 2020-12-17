import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <Image
        className={styles.img}
        height={60}
        width={150}
        layout={'intrinsic'}
        src={'/static/img/logo.png'}
      />
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
          <span>🔍搜索</span>
        </li>
      </ul>
    </div>
  );
}

export default Header;

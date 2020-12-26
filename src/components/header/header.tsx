import React, { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import useLg from 'hooks/useLg';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const isLg = useLg();
  return (
    <header className={styles.header}>
      <div className={`${styles.headerMain} box-responsive`}>
        {!isLg && (
          <Image
            onClick={() => setIsShow(!isShow)}
            height={24}
            width={24}
            layout={'intrinsic'}
            src={'/static/img/menu.png'}
          />
        )}

        <Link href={'/'}>
          <a>
            <Image height={32} width={32} layout={'intrinsic'} src={'/static/img/logo.png'} />
          </a>
        </Link>

        {isLg ? (
          <nav className={styles.menu}>
            <Link href={'/'}>首页</Link>
            <Link href={'/archive'}>归档</Link>
            <Link href={'/tag'}>标签</Link>
            <Link href={'/about'}>关于</Link>
            <Link href={'/theme'}>主题</Link>
            <Link href={'/search'}>搜索</Link>
          </nav>
        ) : (
          <Link href={'/search'}>
            <a>
              <Image height={24} width={24} layout={'intrinsic'} src={'/static/img/search.png'} />
            </a>
          </Link>
        )}
      </div>
      {isShow && !isLg && (
        <nav onClick={() => setIsShow(false)} className={`${styles.dropdown} box-responsive`}>
          <Link href={'/'}>首页</Link>
          <Link href={'/archive'}>归档</Link>
          <Link href={'/tag'}>标签</Link>
          <Link href={'/about'}>关于</Link>
          <Link href={'/theme'}>主题</Link>
          <Link href={'/search'}>搜索</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import useLg from 'hooks/useLg';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const isLg = useLg();
  return (
    <div className={styles.header}>
      <div className={`${styles['header_main']} box-responsive`}>
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
              <Link href={'/search'}>搜索</Link>
            </li>
          </ul>
        ) : (
          <Link href={'/search'}>
            <a>
              <Image height={24} width={24} layout={'intrinsic'} src={'/static/img/search.png'} />
            </a>
          </Link>
        )}
      </div>
      {isShow && (
        <>
          <ul onClick={() => setIsShow(false)} className={`${styles.select} box-responsive`}>
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
              <Link href={'/search'}>搜索</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Header;

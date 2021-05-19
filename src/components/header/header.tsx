import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@zzf/design';
import styles from './header.module.scss';
import Image from 'next/image';
import menus from 'menus.json';
import useIsPc from '../../hooks/useIsPc';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const isPc = useIsPc();
  return (
    <Layout.Header className={styles.header}>
      {isPc ? (
        <>
          <Link href={'/'}>
            <a>
              <Image height={32} width={32} layout={'intrinsic'} src={'/static/img/logo.png'} />
            </a>
          </Link>
          <nav className={styles.menu}>
            {menus.map((menu) => (
              <Link key={menu.name} href={menu.path}>
                {menu.name}
              </Link>
            ))}
          </nav>
        </>
      ) : (
        <>
          <Image
            onClick={() => setIsShow(!isShow)}
            height={24}
            width={24}
            layout={'intrinsic'}
            src={'/static/img/menu.png'}
          />
          <Link href={'/'}>
            <a>
              <Image height={32} width={32} layout={'intrinsic'} src={'/static/img/logo.png'} />
            </a>
          </Link>
          <Link href={'/search'}>
            <a>
              <Image height={24} width={24} layout={'intrinsic'} src={'/static/img/search.png'} />
            </a>
          </Link>
        </>
      )}
      {isShow && !isPc && (
        <nav onClick={() => setIsShow(false)} className={`${styles.dropdown} box-responsive`}>
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              {menu.name}
            </Link>
          ))}
        </nav>
      )}
    </Layout.Header>
  );
}

export default Header;

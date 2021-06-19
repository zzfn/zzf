import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@zzf/design';
import styles from './header.module.scss';
import Image from 'next/image';
import menus from 'menus.json';
import useIsPc from '../../hooks/useIsPc';
import classNames from 'classnames';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const isPc = useIsPc();
  return (
    <>
      <Layout.Header className={styles.header}>
        {isPc ? (
          <>
            <div className={classNames('flex')}>
              <Link href={'/'}>
                <a>
                  <Image
                    className={styles.logo}
                    priority
                    height={32}
                    width={32}
                    layout={'intrinsic'}
                    src={'/static/img/logo_transparent.png'}
                  />
                </a>
              </Link>
              <nav className={styles.menu}>
                {menus.map((menu) => (
                  <Link key={menu.name} href={menu.path}>
                    {menu.name}
                  </Link>
                ))}
              </nav>
            </div>
            <details className='dropdown details-reset details-overlay d-inline-block'>
              <summary className='btn' aria-haspopup='true'>
                主题
                <div className='dropdown-caret' />
              </summary>
              <ul className='dropdown-menu dropdown-menu-se'>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'dark');
                    document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
                  }}
                  className={'dropdown-item'}
                >
                  深色
                </li>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'light');
                    document.querySelector('html').setAttribute('data-dark-theme', 'light');
                  }}
                  className={'dropdown-item'}
                >
                  浅色
                </li>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'auto');
                    document.querySelector('html').setAttribute('data-light-theme', 'light');
                    document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
                  }}
                  className={'dropdown-item'}
                >
                  跟随系统
                </li>
              </ul>
            </details>
          </>
        ) : (
          <>
            <Image
              className={styles.logo}
              onClick={() => setIsShow(!isShow)}
              height={24}
              width={24}
              layout={'intrinsic'}
              src={'/static/img/menu.png'}
            />
            <Link href={'/'}>
              <a>
                <Image
                  className={styles.logo}
                  height={32}
                  width={32}
                  layout={'intrinsic'}
                  src={'/static/img/logo_transparent.png'}
                />
              </a>
            </Link>
            <Link href={'/search'}>
              <a>
                <Image
                  className={styles.logo}
                  height={24}
                  width={24}
                  layout={'intrinsic'}
                  src={'/static/img/search.png'}
                />
              </a>
            </Link>
          </>
        )}
      </Layout.Header>
      {isShow && !isPc && (
        <nav onClick={() => setIsShow(false)} className={styles.dropdown}>
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              {menu.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

export default Header;

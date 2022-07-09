import React from 'react';
import Link from 'next/link';
import { SvgIcon } from '@zzf/design';
import styles from './header.module.scss';
import menus from '../../menus.json';
import classNames from 'classnames';
import Theme from '../Theme';

function Header(): JSX.Element {
  return (
    <>
      <div className={classNames('flex', 'items-center')}>
        <Link href='/'>
          <a className={classNames('text-brand', 'text-xl', 'mr-2', 'text-primary')}>
            cc&apos;s Blog
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
      <div className={classNames('flex', 'items-center')}>
        <Link href='/search'>
          <a className={classNames('text-brand', 'text-xl', 'mr-2', 'text-primary')}>
            <SvgIcon name='search' />
          </a>
        </Link>
        <Theme />
      </div>
    </>
  );
}

export default Header;

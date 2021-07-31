import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, SvgIcon } from '@zzf/design';
import styles from './header.module.scss';
import menus from 'menus.json';
import classNames from 'classnames';
import Theme from '../Theme';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <Layout.Header className={styles.header}>
        <div className={classNames('hidden', 'md:flex')}>
          <Link href={'/'}>
            <a className={'flex items-center color-text-primary text-6xl mr-2'}>
              <SvgIcon className={classNames(styles.logo)} name={'logo'} />
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
        <SvgIcon
          className={classNames('text-4xl inline-block md:hidden', styles.logo)}
          onClick={() => setIsShow(!isShow)}
          name={isShow ? 'close' : 'menu'}
        />
        <Link href={'/'}>
          <a className={'flex items-center color-text-primary inline-block md:hidden'}>
            <SvgIcon className={classNames('text-5xl', styles.logo)} name={'logo'} />
          </a>
        </Link>
        <Theme />
      </Layout.Header>
      {isShow && (
        <nav
          onClick={() => setIsShow(false)}
          className={classNames(styles.dropdown, 'anim-fade-in', 'md:hidden')}
        >
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

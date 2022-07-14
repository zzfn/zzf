import React, { useEffect } from 'react';
import Link from 'next/link';
import { SvgIcon, Modal } from '@zzf/design';
import styles from './header.module.scss';
import menus from '../../menus.json';
import classNames from 'classnames';
import Theme from '../Theme';
import { useRouter } from 'next/router';

function Header(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
  });
  return (
    <>
      <div className={classNames('flex', 'items-center')}>
        <Link href='/'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2', 'text-primary')}>
            cc&apos;s Blog
          </a>
        </Link>
        <nav className={styles.menu}>
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              <a
                className={classNames(
                  menu.path === '/'
                    ? router.pathname === '/' && styles.active
                    : router.pathname.includes(menu.path) && styles.active,
                )}
              >
                {menu.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <div className={classNames('flex', 'items-center')}>
        <Link href='/search'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='search' />
          </a>
        </Link>
        <Link href='/rss/feed.xml'>
          <a target='_blank' className={classNames('text-brand-primary', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='rss' />
          </a>
        </Link>
        <Modal
          title='login'
          toggled={
            <SvgIcon className={classNames('text-brand-primary', 'mr-2')} size={25} name='user' />
          }
        >
          login
        </Modal>
        <Theme />
      </div>
    </>
  );
}

export default Header;

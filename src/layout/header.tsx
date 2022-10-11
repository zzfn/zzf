import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, SvgIcon } from '@ootd/design';
import styles from './header.module.scss';
import menus from '../menus.json';
import classNames from 'classnames';
import Theme from '../components/Theme';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCdn } from 'utils/getCdn';

function Header(): JSX.Element {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const screen = useSelector((state: RootState) => state.screen);

  return (
    <>
      <div className={classNames('flex', 'items-center')}>
        <Link href='/'>
          <a className={classNames('text-primary-4', 'text-xl', 'mr-2')}>
            <Image
              className='w-10 h-10 mr-2'
              width={100}
              height={100}
              src={getCdn('/assets/logo.png')}
              alt='logo'
            />
          </a>
        </Link>
        <nav className={classNames(styles.menu, 'hidden', 'md:flex')}>
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
          <a className={classNames('text-primary-4', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='search' />
          </a>
        </Link>
        <Link href='/rss/feed.xml'>
          <a target='_blank' className={classNames('text-primary-4', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='rss' />
          </a>
        </Link>
        <Theme />
        <Popover
          placement='bottomRight'
          onPopupVisibleChange={(v) => setVisible(v)}
          content={
            <div className='w-screen'>
              <nav>
                {menus.map((menu) => (
                  <Link key={menu.name} href={menu.path}>
                    <a
                      className={classNames(
                        'block',
                        'text-left',
                        'text-xl',
                        'my-2',
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
          }
        >
          <SvgIcon
            className={classNames('text-primary-4 md:hidden')}
            size={25}
            name={visible ? 'close' : 'menu'}
          />
        </Popover>
      </div>
    </>
  );
}

export default Header;

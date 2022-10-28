import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, SvgIcon } from '@oc/design';
import styles from './header.module.scss';
import menus from '../menus.json';
import classNames from 'classnames';
import ThemeDropDown from 'components/ThemeDropDown';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
        <Link className={classNames('text-primary-4', 'text-xl', 'mr-2')} href='/'>
          <Image
            className='w-10 h-10 mr-2'
            width={100}
            height={100}
            src={getCdn('/assets/logo.png')}
            alt='logo'
          />
        </Link>
        <nav className={classNames(styles.menu, 'hidden', 'md:flex')}>
          {menus.map((menu) => (
            <Link
              className={classNames(
                menu.path === '/'
                  ? router.pathname === '/' && styles.active
                  : router.pathname.includes(menu.path) && styles.active,
              )}
              key={menu.name}
              href={menu.path}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className={classNames('flex', 'items-center')}>
        <Link className={classNames('text-primary-4', 'text-xl', 'mr-2')} href='/search'>
          <SvgIcon size={25} name='search' />
        </Link>
        <Link
          className={classNames('text-primary-4', 'text-xl', 'mr-2')}
          target='_blank'
          href='/rss/feed.xml'
        >
          <SvgIcon size={25} name='rss' />
        </Link>
        <ThemeDropDown />
        <Popover
          placement='bottomRight'
          content={
              <nav className="p-3 w-26 bg-card">
                {menus.map((menu) => (
                  <Link
                    className={classNames(
                      'block',
                      'text-left',
                      'text-xl',
                      'my-2',
                      menu.path === '/'
                        ? router.pathname === '/' && styles.active
                        : router.pathname.includes(menu.path) && styles.active,
                    )}
                    key={menu.name}
                    href={menu.path}
                  >
                    {menu.name}
                  </Link>
                ))}
              </nav>
          }
        >
          <SvgIcon
            className={classNames('text-primary-4 md:hidden ml-2')}
            size={25}
            name={visible ? 'close' : 'menu'}
          />
        </Popover>
      </div>
    </>
  );
}

export default Header;

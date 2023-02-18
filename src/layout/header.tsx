import React, { useState } from 'react';
import Link from 'next/link';
import { Popover, SvgIcon } from '@oc/design';
import styles from './header.module.scss';
import menus from '../menus.json';
import classNames from 'classnames';
import ThemeDropDown from 'components/ThemeDropDown';
import { useRouter } from 'next/router';
import { getCdn } from 'utils/getCdn';
import LottiePlayer from '../components/LottiePlayer';

function Header(): JSX.Element {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={classNames('flex', 'items-center')}>
        <Link className={classNames('text-xl', 'mr-2')} href='/'>
          <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
        </Link>
        <nav className={classNames(styles.menu, 'hidden', 'md:flex')}>
          {menus.map((menu) => (
            <Link
              className={classNames(
                'text-base',
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
        <Link
          className={classNames('round-icon', 'text-[var(--secondary-icon)]', 'text-xl', 'mr-2')}
          href='/search'
        >
          <SvgIcon size={25} name='search' />
        </Link>
        <Link
          className={classNames('round-icon', 'text-[var(--secondary-icon)]', 'text-xl', 'mr-2')}
          target='_blank'
          href='/api/feed.xml'
        >
          <SvgIcon size={25} name='rss' />
        </Link>
        <ThemeDropDown />
        <Popover
          placement='bottomRight'
          content={
            <nav className='p-3 w-26 bg-card text-[var(--primary-text)]'>
              {menus.map((menu) => (
                <Link
                  className={classNames(
                    'block',
                    'text-left',
                    'text-xl',
                    'my-2',
                    menu.path === '/'
                      ? router.pathname === '/' && 'text-[var(--accent)]'
                      : router.pathname.includes(menu.path) && 'text-[var(--accent)]',
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
          <span className='round-icon  md:hidden ml-2'>
            <SvgIcon
              className={classNames('text-[var(--secondary-icon)]')}
              size={25}
              name={visible ? 'close' : 'menu'}
            />
          </span>
        </Popover>
      </div>
    </>
  );
}

export default Header;

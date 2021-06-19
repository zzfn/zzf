import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@zzf/design';
import styles from './header.module.scss';
import menus from 'menus.json';
import useIsPc from '../../hooks/useIsPc';
import classNames from 'classnames';
import Icon from '../Icon';

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
                <a className={'flex items-center color-text-primary text-6xl'}>
                  <Icon name={'logo'} />
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
                    localStorage.setItem('data-color-mode', 'dark');
                    localStorage.setItem('data-dark-theme', 'dark_dimmed');
                  }}
                  className={'dropdown-item'}
                >
                  深色
                </li>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'light');
                    document.querySelector('html').setAttribute('data-dark-theme', 'light');
                    localStorage.setItem('data-color-mode', 'light');
                    localStorage.setItem('data-light-theme', 'light');
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
                    localStorage.setItem('data-color-mode', 'auto');
                    localStorage.setItem('data-light-theme', 'light');
                    localStorage.setItem('data-dark-theme', 'dark_dimmed');
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
            <Icon
              className={'color-text-primary text-4xl'}
              onClick={() => setIsShow(!isShow)}
              name={isShow ? 'close' : 'menu'}
            />
            <Link href={'/'}>
              <a className={'flex items-center color-text-primary'}>
                <Icon className={'color-text-primary text-6xl'} name={'logo'} />
              </a>
            </Link>
            <details className='dropdown details-reset details-overlay d-inline-block'>
              <summary aria-haspopup='true'>
                <Icon className={'color-text-primary text-4xl'} name={'setting'} />
              </summary>
              <ul className='dropdown-menu dropdown-menu-sw'>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'dark');
                    document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
                    localStorage.setItem('data-color-mode', 'dark');
                    localStorage.setItem('data-dark-theme', 'dark_dimmed');
                  }}
                  className={'dropdown-item'}
                >
                  深色
                </li>
                <li
                  onClick={() => {
                    document.querySelector('html').setAttribute('data-color-mode', 'light');
                    document.querySelector('html').setAttribute('data-dark-theme', 'light');
                    localStorage.setItem('data-color-mode', 'light');
                    localStorage.setItem('data-light-theme', 'light');
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
                    localStorage.setItem('data-color-mode', 'auto');
                    localStorage.setItem('data-light-theme', 'light');
                    localStorage.setItem('data-dark-theme', 'dark_dimmed');
                  }}
                  className={'dropdown-item'}
                >
                  跟随系统
                </li>
              </ul>
            </details>
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

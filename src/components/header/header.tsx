import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@zzf/design';
import styles from './header.module.scss';
import menus from 'menus.json';
import classNames from 'classnames';
import Icon from '../Icon';

function Header(): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <Layout.Header className={styles.header}>
        <div className={classNames('hidden', 'md:flex')}>
          <Link href={'/'}>
            <a className={'flex items-center color-text-primary text-6xl'}>
              <Icon className={styles.logo} name={'logo'} />
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
        <details className='dropdown details-reset details-overlay hidden md:inline-block'>
          <summary className={'text-gray p-2 d-inline'} aria-haspopup='true'>
            主题
            <div className='dropdown-caret' />
          </summary>
          <ul className={classNames('dropdown-menu dropdown-menu-sw', styles.theme)}>
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
        <section className={'md:hidden flex justify-between items-center flex-1'}>
          <Icon
            className={classNames('text-4xl', styles.logo)}
            onClick={() => setIsShow(!isShow)}
            name={isShow ? 'close' : 'menu'}
          />
          <Link href={'/'}>
            <a className={'flex items-center color-text-primary'}>
              <Icon className={classNames('text-5xl', styles.logo)} name={'logo'} />
            </a>
          </Link>
          <details className='dropdown details-reset details-overlay d-inline-block'>
            <summary aria-haspopup='true'>
              <Icon className={classNames('text-4xl', styles.logo)} name={'setting'} />
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
        </section>
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

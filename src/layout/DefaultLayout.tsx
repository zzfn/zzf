import { NavigationDraw, NavigationRail, IconButton, List, ListItem, Tooltip } from '@oc/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import { css } from '@emotion/css';
import classNames from 'classnames';
import {NAV_DATASOURCE} from './NAV_DATASOURCE'
import {
  IconAuto,
  IconClose,
  IconCode,
  IconMenu, IconMenuOpen,
  IconMoon,
  IconRss,
  IconSearch,
  IconSun
} from "@oc/icon";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';
import { initTheme, setTheme } from '../utils/theme';
import useMediaQuery from '../hooks/useMediaQuery';

export const container = css`
  padding: 0 16px;
  @media (min-width: 600px) {
    padding: 0 24px;
  }
  @media (min-width: 840px) {
    padding-right: 24px;
  }
`;
const nav = css`
  transition: 0.3s;
  position: relative;
  text-align: center;

  &:before {
    content: '';
    width: 2px;
    height: 100%;
    background-color: var(--md-sys-color-primary);
    position: absolute;
    right: 0;
    visibility: hidden;
    transform: scaleY(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover {
    background-color: var(--md-sys-color-secondary-container);
    border-radius: 8px;

    &:before {
      visibility: visible;
      transform: scaleY(1);
    }
  }

  &[data-active='active'] {
    color: var(--md-sys-color-primary);

    &:before {
      visibility: visible;
      transform: scaleY(1);
    }
  }
`;
const ThemeDataSource = ['light', 'dark', 'system', 'light'];
const iconMap = {
  light: IconSun,
  dark: IconMoon,
  system: IconAuto,
};

function DefaultLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState('light');
  const [visible, setVisible] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 961px)');
  useEffect(() => {
    const theme: any = localStorage.getItem('data-color-mode');
    if (theme) {
      setActive(theme);
      initTheme();
    }
  }, []);
  return (
    <>
      <NavigationDraw visible={visible}>
        <List>
          <ListItem className='justify-center'>
            <IconMenuOpen
              onClick={() => setVisible(false)}
              className={classNames('text-[var(--secondary-icon)] text-2xl')}
            />
          </ListItem>
          {NAV_DATASOURCE.map((_) => (
            <ListItem key={_.name}>
              <Link
                data-active={
                  _.path === '/'
                    ? router.pathname === '/' && 'active'
                    : router.pathname.includes(_.path) && 'active'
                }
                className={classNames(
                  'flex flex-col justify-center',
                  'items-center',
                  'text-base',
                  'w-full',
                  nav,
                )}
                key={_.name}
                href={_.path}
              >
                <div className="flex">
                  {React.createElement(_.icon)}
                  {_.name}
                </div>
              </Link>
            </ListItem>
          ))}
          <ListItem className='justify-center'>
            <Link
              className={classNames('text-[var(--secondary-icon)]', 'text-2xl')}
              target='_blank'
              href='/api/feed.xml'
            >
              <Tooltip content='Rss 订阅'>
                <IconButton>
                  <IconRss />
                </IconButton>
              </Tooltip>
            </Link>
          </ListItem>
          <ListItem className='justify-center'>
            <Tooltip content={active}>
              <IconButton
                onClick={() => {
                  const idx = ThemeDataSource.findIndex((_) => _ === active);
                  setActive(ThemeDataSource[idx + 1]);
                  setTheme(ThemeDataSource[idx + 1]);
                }}
              >
                {React.createElement((iconMap as any)[active], {
                  className: 'text-[var(--secondary-icon)] text-2xl',
                })}
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </NavigationDraw>
      {isDesktop && (
        <NavigationRail visible>
          <List>
            <ListItem className='justify-center'>
              <Link className={classNames('text-xl', 'mr-auto', 'md:mr-0')} href='/'>
                <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
              </Link>
            </ListItem>
            {NAV_DATASOURCE.map((_) => (
              <ListItem key={_.name}>
                <Link
                  data-active={
                    _.path === '/'
                      ? router.pathname === '/' && 'active'
                      : router.pathname.includes(_.path) && 'active'
                  }
                  className={classNames(
                    'flex flex-col justify-center',
                    'items-center',
                    'text-base',
                    'w-full',
                    nav,
                  )}
                  key={_.name}
                  href={_.path}
                >
                  {React.createElement(_.icon)}
                  {_.name}
                </Link>
              </ListItem>
            ))}
            <ListItem className='justify-center'>
              <Link
                className={classNames('text-[var(--secondary-icon)]', 'text-2xl')}
                target='_blank'
                href='/api/feed.xml'
              >
                <Tooltip content='Rss 订阅'>
                  <IconButton>
                    <IconRss />
                  </IconButton>
                </Tooltip>
              </Link>
            </ListItem>
            <ListItem className='justify-center'>
              <Tooltip content={active}>
                <IconButton
                  onClick={() => {
                    const idx = ThemeDataSource.findIndex((_) => _ === active);
                    setActive(ThemeDataSource[idx + 1]);
                    setTheme(ThemeDataSource[idx + 1]);
                  }}
                >
                  {React.createElement((iconMap as any)[active], {
                    className: 'text-[var(--secondary-icon)] text-2xl',
                  })}
                </IconButton>
              </Tooltip>
              {/*<Menu*/}
              {/*  placement='bottomRight'*/}
              {/*  items={ThemeDataSource.map((theme) => (*/}
              {/*    <span*/}
              {/*      onClick={() => {*/}
              {/*        setActive(theme);*/}
              {/*        setTheme(theme);*/}
              {/*      }}*/}
              {/*      className={classNames(*/}
              {/*        active === theme && 'text-[var(--md-sys-color-primary)]',*/}
              {/*        'w-32',*/}
              {/*        'flex',*/}
              {/*        'items-center',*/}
              {/*        'px-2',*/}
              {/*        'py-1',*/}
              {/*        'cursor-pointer',*/}
              {/*      )}*/}
              {/*      key={theme}*/}
              {/*    >*/}
              {/*    {React.createElement((iconMap as any)[theme], {*/}
              {/*      className: 'mr-2 text-2xl',*/}
              {/*    })}*/}
              {/*      {theme}*/}
              {/*  </span>*/}
              {/*  ))}*/}
              {/*>*/}
              {/*  <IconButton>*/}
              {/*    {React.createElement((iconMap as any)[active], {*/}
              {/*      className: 'text-[var(--secondary-icon)] text-2xl',*/}
              {/*    })}*/}
              {/*  </IconButton>*/}
              {/*</Menu>*/}
            </ListItem>
            {/*<Menu*/}
            {/*  placement='bottomRight'*/}
            {/*  items={menus.map((menu) => (*/}
            {/*    <Link*/}
            {/*      className={classNames(*/}
            {/*        'block',*/}
            {/*        'w-full',*/}
            {/*        'text-left',*/}
            {/*        menu.path === '/'*/}
            {/*          ? router.pathname === '/' && 'text-[var(--accent)]'*/}
            {/*          : router.pathname.includes(menu.path) && 'text-[var(--accent)]',*/}
            {/*      )}*/}
            {/*      key={menu.name}*/}
            {/*      href={menu.path}*/}
            {/*    >*/}
            {/*      {menu.name}*/}
            {/*    </Link>*/}
            {/*  ))}*/}
            {/*>*/}
            {/*  <IconButton>*/}
            {/*    <IconMenu className={classNames('md:hidden text-[var(--secondary-icon)] text-xl')} />*/}
            {/*  </IconButton>*/}
            {/*</Menu>*/}
          </List>
        </NavigationRail>
      )}
      <div className='desktop:ml-20'>
        <section className={classNames('min-h-screen', 'pl-[88px]', container)}>
          {!isDesktop && (
            <header className='flex w-full items-center'>
              <IconMenu
                onClick={() => setVisible(true)}
                className={classNames('text-[var(--secondary-icon)] text-2xl')}
              />
              <Link className={classNames('text-2xl')} href='/'>
                <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
              </Link>
            </header>
          )}
          <Header />
          <main className={classNames('mx-auto')}>{children}</main>
          <Footer />
        </section>
      </div>
    </>
  );
}

export default DefaultLayout;

import { IconButton, Tooltip } from '@oc/design';
import Link from 'next/link';
import classNames from 'classnames';
import { NAV_DATASOURCE } from './NAV_DATASOURCE';
import React, { useState } from 'react';
import { setTheme } from '../utils/theme';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import IconSymbols from '../components/IconSymbols';
import LottiePlayer from "../components/LottiePlayer";
import { getCdn } from "../utils/getCdn";

const nav = css`
  transition: 0.3s;
  position: relative;
  text-align: center;

  &:before {
    content: '';
    height: 2px;
    width: 100%;
    background-color: var(--md-sys-color-primary);
    position: absolute;
    bottom: 0;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover {
    color: var(--md-sys-color-primary);
    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  &[data-active='active'] {
    span {
      background: var(--md-sys-color-secondary-container);
    }

    &:before {
      visibility: visible;
      transform: scaleX(1);
    }

    [data-icon] {
      color: var(--md-sys-color-primary);
      font-variation-settings: 'FILL' 1, 'wght' 400;
    }
  }
`;
const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState('auto');
  return (
    <nav
      className={classNames(
        'fixed',
        'z-10',
        'left-0',
        'h-16',
        'top-0',
        'w-full',
        'flex',
        'justify-between',
        'items-center',
        'bg-surface-1',
        'px-5',
        'gap-x-3',
        'text-lg'
      )}
    >
      <Link href='/' className='mr-auto hover:text-primary flex items-center'>
        <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
        <span>Heycc&apos;s Blog</span>
      </Link>
      {NAV_DATASOURCE.map((_) => (
        <Link
          data-active={
            _.path === '/'
              ? router.pathname === '/' && 'active'
              : router.pathname.includes(_.path) && 'active'
          }
          className={classNames(
            'group flex items-center',
            'flex',
            'items-center',
            'justify-center',
            nav,
          )}
          key={_.name}
          href={_.path}
        >
          {_.name}
        </Link>
      ))}
      <Link
        className={classNames('text-[var(--secondary-icon)] inline-flex')}
        target='_blank'
        href='/api/feed.xml'
      >
        <Tooltip placement='bottom' content='RSS 订阅'>
          <IconButton variant='default'>
            <IconSymbols icon='rss_feed' />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip placement='bottom' content={active}>
        <IconButton variant='default'>
          <IconSymbols
            onClick={() => {
            const ThemeDataSource = ['light', 'dark', 'auto', 'light'];
            const idx = ThemeDataSource.findIndex((_) => _ === active);
            setActive(ThemeDataSource[idx + 1]);
            setTheme(ThemeDataSource[idx + 1]);
          }} icon={`${active}_mode`} />
        </IconButton>
      </Tooltip>
    </nav>
  );
};
export default Header;

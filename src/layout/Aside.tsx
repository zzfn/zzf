import { IconButton, Tooltip } from '@oc/design';
import Link from 'next/link';
import classNames from 'classnames';
import { NAV_DATASOURCE } from './NAV_DATASOURCE';
import React, { useState } from 'react';
import { setTheme } from '../utils/theme';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import IconSymbols from '../components/IconSymbols';

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
    background-color: var(--md-sys-color-surface-5);
    border-radius: 8px;

    &:before {
      visibility: visible;
      transform: scaleY(1);
    }
  }

  &[data-active='active'] {
    span {
      background: var(--md-sys-color-secondary-container);
    }

    &:before {
      visibility: visible;
      transform: scaleY(1);
    }

    [data-icon] {
      color: var(--md-sys-color-primary);
      font-variation-settings: 'FILL' 1, 'wght' 400;
    }
  }
`;
const Aside = () => {
  const router = useRouter();
  const [active, setActive] = useState('auto');
  return (
    <nav
      className={classNames(
        'fixed',
        'left-0',
        'top-0',
        'hidden',
        'expanded:flex',
        'pb-6',
        'flex-col',
        'justify-between',
        'h-full',
        'bg-surface-1',
      )}
    >
      <div>
        {NAV_DATASOURCE.map((_) => (
          <div className='group' key={_.name}>
            <Link
              data-active={
                _.path === '/'
                  ? router.pathname === '/' && 'active'
                  : router.pathname.includes(_.path) && 'active'
              }
              className={classNames(
                'flex',
                'flex-col',
                'items-center',
                'justify-center',
                'w-20',
                'gap-x-4',
                'h-20',
                'text-base',
                nav,
              )}
              key={_.name}
              href={_.path}
            >
              <span
                className={classNames(
                  'text-2xl',
                  css({
                    width: '56px',
                    height: '32px',
                    transitionDuration: '200ms',
                    transitionProperty: 'transform, opacity',
                    transitionTimingFunction: 'linear',
                    borderRadius: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }),
                )}
              >
                <IconSymbols className={classNames('group-hover:icon-fill-1 group-hover:text-primary')} icon={_.icon} />
              </span>
              {_.name}
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Link
          className={classNames('text-[var(--secondary-icon)]', 'text-2xl')}
          target='_blank'
          href='/api/feed.xml'
        >
          <Tooltip placement='right' content='RSS 订阅'>
            <IconButton>
              <IconSymbols icon='rss_feed' />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip placement='right' content={active}>
          <IconButton
            className='text-2xl'
            onClick={() => {
              const ThemeDataSource = ['light', 'dark', 'auto', 'light'];
              const idx = ThemeDataSource.findIndex((_) => _ === active);
              setActive(ThemeDataSource[idx + 1]);
              setTheme(ThemeDataSource[idx + 1]);
            }}
          >
            <IconSymbols icon={`${active}_mode`} />
          </IconButton>
        </Tooltip>
      </div>
    </nav>
  );
};
export default Aside;

import { IconButton, List, ListItem, NavigationDraw, Tooltip } from '@oc/design';
import classNames from 'classnames';
import { NAV_DATASOURCE } from './NAV_DATASOURCE';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import IconSymbols from '../components/IconSymbols';
import { setTheme } from '../utils/theme';
import useMediaQuery from '../hooks/useMediaQuery';

const nav = css`
  transition: 0.3s;
  position: relative;
  text-align: center;

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
const NavDraw = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (v: boolean) => void;
}) => {
  const router = useRouter();
  const [active, setActive] = useState('light');
  return (
    <NavigationDraw onCancel={() => setVisible(false)} visible={visible}>
      <header className='h-12 pl-6 flex items-center my-2'>
        <IconButton
          className={classNames('text-2xl')}
          variant='filled'
          onClick={() => setVisible(false)}
        >
          <IconSymbols icon='menu_open' />
        </IconButton>
      </header>
      <List>
        {NAV_DATASOURCE.map((_) => (
          <ListItem className={classNames('group', nav)} key={_.name}>
            <Link
              data-active={
                _.path === '/'
                  ? router.pathname === '/' && 'active'
                  : router.pathname.includes(_.path) && 'active'
              }
              className={classNames(
                'flex',
                'px-6',
                'items-center',
                'w-full',
                'group-hover:font-[700]',
                'text-base'
              )}
              key={_.name}
              href={_.path}
            >
              <span className='text-2xl'><IconSymbols className='group-hover:hov' icon={_.icon} /></span>
              <span className='ml-4'>{_.name}</span>
              <IconSymbols className='ml-auto group-hover:hov' icon='arrow_forward' />
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
                <IconSymbols icon='rss_feed' />
              </IconButton>
            </Tooltip>
          </Link>
        </ListItem>
        <ListItem className='justify-center'>
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
        </ListItem>
      </List>
    </NavigationDraw>
  );
};
export default NavDraw;

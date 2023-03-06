import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { Popover } from '@oc/design';
import { IconSun, IconMoon, IconPc } from '@oc/icon';

const ThemeDataSource = ['light', 'dark', 'system'];
const iconMap = {
  light: IconSun,
  dark: IconMoon,
  system: IconPc,
};
const ThemeDropDown: FC = () => {
  const [active, setActive] = useState('light');

  useEffect(() => {
    const theme:any= localStorage.getItem('data-color-mode');
    if (theme) {
      setActive(theme);
      initTheme();
    }
  }, []);

  return (
    <Popover
      placement='bottomRight'
      content={
        <ul className='p-2 text-primary-2'>
          {ThemeDataSource.map((theme) => (
            <li
              onClick={() => {
                setActive(theme);
                setTheme(theme);
              }}
              className={classNames(
                active === theme ? 'text-[var(--accent)]' : 'text-[var(--primary-text-reverse)]',
                'w-32',
                'text-base',
                'flex',
                'items-center',
                'px-2',
                'py-1',
                'cursor-pointer',
              )}
              key={theme}
            >
              {React.createElement((iconMap as any)[theme], {
                className: 'mr-2',
              })}
              {theme}
            </li>
          ))}
        </ul>
      }
    >
      <span className='round-icon'>
        {React.createElement((iconMap as any)[active], {
          className: 'text-[var(--secondary-icon)] text-2xl',
        })}
      </span>
    </Popover>
  );
};

export default ThemeDropDown;

import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { Popover, SvgIcon } from '@oc/design';

const ThemeDataSource = ['light', 'dark', 'system'];
const ThemeDropDown: FC = () => {
  const [active, setActive] = useState('light');

  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    if (theme) {
      setActive(theme);
      initTheme();
    }
  }, []);

  return (
    <Popover
      placement='bottomRight'
      content={
        <ul className='p-2 text-primary-2 bg-card'>
          {ThemeDataSource.map((theme) => (
            <li
              onClick={() => {
                setActive(theme);
                setTheme(theme);
              }}
              className={classNames(
                active === theme ? 'text-[var(--accent)]' : 'text-primary',
                'w-32',
                'flex',
                'items-center',
                'px-2',
                'py-1',
                'cursor-pointer',
              )}
              key={theme}
            >
              <SvgIcon className='mr-2' name={theme} />
              {theme}
            </li>
          ))}
        </ul>
      }
    >
      <span className='round-icon'>
        <SvgIcon className='text-[var(--secondary-icon)]' size={25} name={active} />
      </span>
    </Popover>
  );
};

export default ThemeDropDown;

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
        <ul className="p-2 text-primary-2 bg-surface rounded">
          {ThemeDataSource.map((theme) => (
            <li
              onClick={() => {
                setActive(theme);
                setTheme(theme);
              }}
              className={classNames(
                active === theme ? 'text-primary-4' : 'text-primary',
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
      <SvgIcon className='text-primary-4' size={25} name={active} />
    </Popover>
  );
};

export default ThemeDropDown;

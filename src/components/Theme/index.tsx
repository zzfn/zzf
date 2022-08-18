import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { Popover, SvgIcon } from '@dekopon/design';
import styles from './index.module.scss';

const ThemeDataSource = ['light', 'dark', 'system'];
const Theme: FC = () => {
  const [active, setActive] = useState('light');

  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    if (theme) {
      setActive(theme);
      initTheme();
    }
  }, []);

  return (
    <div className='relative mr-2'>
      <Popover
        onPopupVisibleChange={console.log}
        align='bottomRight'
        content={
          <ul className={classNames('bg-primary', styles.dropdown)}>
            {ThemeDataSource.map((theme) => (
              <li
                onClick={() => {
                  setActive(theme);
                  setTheme(theme);
                }}
                className={classNames(
                  active === theme ? 'text-brand-primary' : 'text-secondary',
                  'w-32',
                  'flex',
                  'items-center',
                  'px-2',
                  'py-1',
                )}
                key={theme}
              >
                <SvgIcon className='mr-2' size={20} name={theme} />
                <div>{theme}</div>
              </li>
            ))}
          </ul>
        }
      >
        <span>
          <SvgIcon className='text-brand-primary' size={25} name={active} />
        </span>
      </Popover>
    </div>
  );
};

export default Theme;

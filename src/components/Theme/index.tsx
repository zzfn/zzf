import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { Popover, SvgIcon } from '@oc/design';
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
    <Popover
      placement='bottomRight'
      content={
        <ul className={styles.wrap}>
          {ThemeDataSource.map((theme) => (
            <li
              onClick={() => {
                setActive(theme);
                setTheme(theme);
              }}
              className={classNames(
                active === theme ? 'text-primary-4' : 'text-neutral-4',
                'w-32',
                'flex',
                'items-center',
                'px-2',
                'py-1',
                'cursor-pointer',
              )}
              key={theme}
            >
              <SvgIcon size={20} name={theme} />
              <div>{theme}</div>
            </li>
          ))}
        </ul>
      }
    >
      <SvgIcon className='text-primary-4' size={25} name={active} />
    </Popover>
  );
};

export default Theme;

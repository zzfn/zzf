import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { SvgIcon } from '@zzf/design';
import styles from './index.module.scss';
import useOutsideClick from 'hooks/useOutsideClick';

const ThemeDataSource = ['light', 'dark', 'system'];
const Theme: FC = () => {
  const [active, setActive] = useState('light');
  const [visible, setVisible] = useState(false);

  const ref = useOutsideClick<HTMLUListElement>(() => setVisible(false));

  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    if (theme) {
      setActive(theme);
      initTheme();
    }
  }, []);

  return (
    <div className='relative'>
      <SvgIcon
        className='text-brand-primary'
        onClick={() => setVisible(!visible)}
        size={25}
        name={active}
      />
      {visible && (
        <ul ref={ref} className={classNames('absolute', 'bg-primary', styles.dropdown)}>
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
      )}
    </div>
  );
};

export default Theme;

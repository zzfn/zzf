import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { SvgIcon } from '@zzf/design';

const ThemeDataSource = ['light', 'dark', 'system'];
const Theme: FC = () => {
  const [active, setActive] = useState('light');
  const [visible, setVisible] = useState(false);

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
        <ul className={classNames('absolute', 'bg-primary')}>
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
              )}
              key={theme}
            >
              <SvgIcon size={20} name={theme} />
              {theme}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Theme;

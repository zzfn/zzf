import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { initTheme, setTheme } from 'utils/theme';
import { SvgIcon } from '@zzf/design';

const ThemeDataSource = ['light', 'dark', 'auto'];
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
      <SvgIcon onClick={() => setVisible(!visible)} size={30} name='light' />
      {visible && (
        <ul className={classNames('absolute', 'bg-primary')}>
          {ThemeDataSource.map((theme) => (
            <li
              onClick={() => {
                setActive(theme);
                setTheme(theme);
              }}
              className={classNames(
                active === theme ? 'text-primary' : 'text-info',
                'w-32',
                'flex',
              )}
              key={theme}
            >
              <SvgIcon size={30} name={theme} />
              {theme}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Theme;

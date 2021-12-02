import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import styles from './index.module.scss';
import { setTheme } from '../../utils/theme';

const ThemeDataSource = ['light', 'dark', 'system'];
const Theme: FC = () => {
  const [active, setActive] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.value);
  };
  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    setActive(theme);
  }, []);
  useEffect(() => {
    setTheme(active);
  }, [active]);
  return (
    <ul className={classNames('flex', styles.theme)}>
      {ThemeDataSource.map((theme) => (
        <li key={theme}>
          <input
            checked={active === theme}
            onChange={handleChange}
            value={theme}
            id={theme}
            name={'theme'}
            type='radio'
          />
          <label htmlFor={theme}>
            <Icon size={30} name={theme} />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Theme;

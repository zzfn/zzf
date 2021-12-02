import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import styles from './index.module.scss';
import { setTheme } from '../../utils/theme';

const translate = new Map([
  ['light', '浅色'],
  ['dark', '深色'],
  ['auto', '自动'],
]);
const ThemeDataSource = ['light', 'dark', 'auto'];
const Theme: FC = () => {
  const [active, setActive] = useState('light');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.value);
  };

  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    if (translate.get(theme)) {
      setActive(theme);
    } else {
      setActive('light');
    }
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
          <label title={translate.get(theme)} htmlFor={theme}>
            <Icon className={styles.icon} size={30} name={theme} />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Theme;

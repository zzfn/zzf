import { useEffect, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import styles from './theme.module.scss';
import { setTheme } from '../utils/theme';

const Theme: FC = () => {
  const [active, setActive] = useState('');
  useEffect(() => {
    const theme = localStorage.getItem('data-color-mode');
    setActive(theme);
  }, []);
  return (
    <details className={styles.theme}>
      <summary aria-haspopup='true'>
        <span className={'hidden md:inline-block'}>主题</span>
        <Icon className={classNames('text-4xl', 'inline-block md:hidden')} name={'setting'} />
      </summary>
      <ul className={styles.dropdown}>
        <li
          onClick={() => {
            setTheme('dark');
            setActive('dark');
          }}
          className={classNames(active === 'dark' && styles.active)}
        >
          深色
        </li>
        <li
          onClick={() => {
            setTheme('light');
            setActive('light');
          }}
          className={classNames(active === 'light' && styles.active)}
        >
          浅色
        </li>
        <li
          onClick={() => {
            setTheme('auto');
            setActive('auto');
          }}
          className={classNames(active === 'auto' && styles.active)}
        >
          跟随系统
        </li>
      </ul>
    </details>
  );
};

export default Theme;

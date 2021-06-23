import type { FC } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import styles from './header/header.module.scss';
import React from 'react';

type ThemeProps = {
  className?: string;
};
const Theme: FC<ThemeProps> = ({ children, className }) => {
  return (
    <details className={classNames('dropdown details-reset details-overlay', className)}>
      <summary aria-haspopup='true'>
        <span className={'hidden md:inline-block'}>
          主题
          <div className='dropdown-caret' />
        </span>
        <Icon
          className={classNames('text-4xl', 'inline-block md:hidden', styles.logo)}
          name={'setting'}
        />
      </summary>
      <ul className='dropdown-menu dropdown-menu-sw'>
        <li
          onClick={() => {
            document.querySelector('html').setAttribute('data-color-mode', 'dark');
            document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
            localStorage.setItem('data-color-mode', 'dark');
            localStorage.setItem('data-dark-theme', 'dark_dimmed');
          }}
          className={'dropdown-item'}
        >
          深色
        </li>
        <li
          onClick={() => {
            document.querySelector('html').setAttribute('data-color-mode', 'light');
            document.querySelector('html').setAttribute('data-dark-theme', 'light');
            localStorage.setItem('data-color-mode', 'light');
            localStorage.setItem('data-light-theme', 'light');
          }}
          className={'dropdown-item'}
        >
          浅色
        </li>
        <li
          onClick={() => {
            document.querySelector('html').setAttribute('data-color-mode', 'auto');
            document.querySelector('html').setAttribute('data-light-theme', 'light');
            document.querySelector('html').setAttribute('data-dark-theme', 'dark_dimmed');
            localStorage.setItem('data-color-mode', 'auto');
            localStorage.setItem('data-light-theme', 'light');
            localStorage.setItem('data-dark-theme', 'dark_dimmed');
          }}
          className={'dropdown-item'}
        >
          跟随系统
        </li>
      </ul>
    </details>
  );
};

export default Theme;

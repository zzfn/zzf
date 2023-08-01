'use client';
import IconSymbols from './IconSymbols';
import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-color-mode', theme);
  }, [theme]);
  return (
    <IconSymbols
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      icon={`${theme}_mode`}
    />
  );
};
export default ThemeButton;

'use client';
import IconSymbols from './IconSymbols';
import { useEffect, useState } from 'react';
import { IconButton } from "@oc/design";

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-color-mode', theme);
  }, [theme]);
  return (
    <IconButton>
      <IconSymbols
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
        icon={`${theme}_mode`}
      />
    </IconButton>
  );
};
export default ThemeButton;

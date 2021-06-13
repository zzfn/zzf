import React, { useEffect, useState } from 'react';
import { Tabs } from '@zzf/design';

const options = [
  {
    value: 'light',
    label: '浅色',
  },
  {
    value: 'dark',
    label: '深色',
  },
  {
    value: 'system',
    label: '跟随系统',
  },
];

function Theme(): JSX.Element {
  const [mode, setMode] = useState('system');

  function handleClick(mode) {
    console.log(mode);
    setMode(mode);
    if (mode === 'system') {
      document.body.className = 'system';
    } else {
      document.body.className = mode;
    }
    localStorage.setItem('mode', mode);
  }

  useEffect(() => {
    // const m = localStorage.getItem('mode');
    //
    // if (m) {
    //   setMode(m);
    //   document.body.className = m;
    // } else {
    //   setMode('system');
    //   document.body.className = 'system';
    // }
  }, []);
  return <Tabs value={mode} onChange={(value) => handleClick(value)} options={options} />;
}

export default Theme;

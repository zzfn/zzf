'use client';
import dynamic from 'next/dynamic';

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), { ssr: false });
export default ThemeSwitch;

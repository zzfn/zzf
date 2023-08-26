'use client';
import type { ReactNode } from 'react';
import { ThemeProvider } from './InitTheme';

const RecoilRootProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute='data-color-mode'>{children}</ThemeProvider>;
};
export default RecoilRootProvider;

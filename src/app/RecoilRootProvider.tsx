'use client';
import { RecoilRoot } from 'recoil';
import type { ReactNode } from 'react';
import { ThemeProvider } from './InitTheme';

const RecoilRootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <ThemeProvider attribute='data-color-mode'>{children}</ThemeProvider>
    </RecoilRoot>
  );
};
export default RecoilRootProvider;

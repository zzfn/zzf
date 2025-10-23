'use client';

import type { ReactNode } from 'react';
import MessageProvider from './MessageProvider';

interface ConfigProviderProps {
  children: ReactNode;
  value?: Record<string, unknown>;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  return <MessageProvider>{children}</MessageProvider>;
};

export default ConfigProvider;

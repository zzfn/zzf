'use client';
import { Sandpack } from '@codesandbox/sandpack-react';
import type { ComponentProps } from 'react';

type CodeSandpackProps = ComponentProps<typeof Sandpack>;

const CodeSandpack = (props: CodeSandpackProps) => {
  return (
    <Sandpack
      {...props}
      options={{
        showTabs: true,
        closableTabs: true,
      }}
    />
  );
};
export default CodeSandpack;

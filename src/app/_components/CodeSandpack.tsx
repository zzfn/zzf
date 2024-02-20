'use client';
import { Sandpack } from '@codesandbox/sandpack-react';

const CodeSandpack = (props: any) => {
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

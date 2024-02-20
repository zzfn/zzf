'use client';
import { Sandpack } from '@codesandbox/sandpack-react';

const CodeSandpack = (props) => {
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

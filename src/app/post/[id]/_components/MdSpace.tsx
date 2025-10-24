'use client';
import { Space } from '@/components/ui';
import type { ReactElement, ReactNode } from 'react';
import { Children, Fragment } from 'react';

type MdSpaceProps = {
  children: ReactElement<{ children?: ReactNode }>;
};

const MdSpace = ({ children }: MdSpaceProps) => {
  const content = children.props.children;
  return (
    <Space>
      {Children.map(content, (child, index) => (
        <Fragment key={(child as ReactElement | null)?.key ?? index}>{child}</Fragment>
      ))}
    </Space>
  );
};
export default MdSpace;

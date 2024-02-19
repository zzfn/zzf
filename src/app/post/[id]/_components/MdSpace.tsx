'use client';
import { Space } from '@oc/design';
import { Children, Fragment } from 'react';

const MdSpace = (props: any) => {
  return (
    <Space>
      {Children.map(props.children.props.children, (child) => (
        <Fragment key={child.key}>{child}</Fragment>
      ))}
    </Space>
  );
};
export default MdSpace;

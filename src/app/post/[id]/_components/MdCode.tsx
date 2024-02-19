'use client';

import { Button, Space, Tag, useMessage } from '@oc/design';

const MdCode = (props: any) => {
  console.log();
  const message = useMessage();
  return (
    <pre>
      <div className='flex justify-between'>
        <Tag>{props.children.props.className?.replace('language-', '')}</Tag>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(props.children.props.children);
            message?.add({ content: 'Copied', type: 'success' });
          }}
        >
          Copy
        </Button>
      </div>
      {props.children}
    </pre>
  );
};
export default MdCode;

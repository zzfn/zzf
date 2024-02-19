'use client';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-json5';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ignore';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markup';
import { Button, Tag, useMessage } from '@oc/design';

const MdCode = (props: any) => {
  console.log('props', props);
  const message = useMessage();
  const lang = props.className?.replace('language-', '');
  if (!props.className) {
    return <code>{props.children}</code>;
  }
  return (
    <>
      <div className='flex justify-between'>
        {lang && <Tag>{lang}</Tag>}
        <Button
          className='ml-auto'
          onClick={async () => {
            await navigator.clipboard.writeText(props.children);
            message?.add({ content: 'Copied', type: 'success' });
          }}
        >
          Copy
        </Button>
      </div>
      <code
        className={props.className}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(props.children, Prism.languages[lang], lang),
        }}
      />
    </>
  );
};
export default MdCode;

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
import { useMessage } from '@oc/design';

const MdCode = (props: any) => {
  const message = useMessage();
  const lang = props.className?.replace('language-', '');
  if (!props.className) {
    return <code>{props.children}</code>;
  }
  return (
    <>
      <div className='absolute right-2 top-2 flex justify-end'>
        {lang && <span className='block px-2 group-hover:hidden'>{lang}</span>}
        <span
          className='ml-auto hidden cursor-pointer rounded bg-success-muted px-2 text-accent group-hover:block'
          onClick={async () => {
            await navigator.clipboard.writeText(props.children);
            message?.add({ content: 'Copied', type: 'success' });
          }}
        >
          Copy
        </span>
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

import React from 'react';
import hljs from 'highlight.js';
import styles from './code.module.scss';

type CodeProps = {
  ({ language, code }: { language: string; code: string }): JSX.Element;
};
const Code: CodeProps = ({ language, code }) => {
  return (
    <div className={styles.code}>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: language
              ? hljs.highlight(code, { language }).value
              : hljs.highlightAuto(code).value,
          }}
          className={`language-${language}`}
          lang={language}
        />
      </pre>
      <div className={styles.action}>
        <a
          lang={language}
          style={{ color: '#8c8c8ccc', border: 'none', cursor: 'pointer', userSelect: 'none' }}
        >
          {/*复制代码*/}
        </a>
      </div>
    </div>
  );
};
export default Code;

import React from 'react';
import hljs from 'highlight.js';
import styles from './code.module.scss';

export default function Code({ language, code }) {
  return (
    <div className={styles.code}>
      <pre>
        <code className={`language-${language}`} lang={language}>
          <div
            dangerouslySetInnerHTML={{
              __html: language
                ? hljs.highlight(language, code).value
                : hljs.highlightAuto(code).value,
            }}
          />
        </code>
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
}

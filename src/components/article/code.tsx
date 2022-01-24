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
      <div className={styles.action}>{language}</div>
    </div>
  );
};
export default Code;

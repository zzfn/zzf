import React from 'react';
import hljs from 'highlight.js';
import styles from './code.module.scss';

type CodeProps = {
  ({ language, code }: { language: string; code: string }): JSX.Element;
};
const Code: CodeProps = ({ language, code }) => {
  const handleClick = () => {
    console.log('Code');
  };
  return (
    <pre onClick={handleClick} className={styles.code}>
      <code
        dangerouslySetInnerHTML={{
          __html: language
            ? hljs.highlight(code, { language }).value
            : hljs.highlightAuto(code).value,
        }}
        className={`language-${language}`}
        lang={language}
      />
      {language && <div className={styles.action}>{language}</div>}
    </pre>
  );
};
export default Code;

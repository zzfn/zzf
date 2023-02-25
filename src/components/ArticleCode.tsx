import React from 'react';
import hljs from 'highlight.js';

type CodeProps = {
  ({ language, code }: { language: string; code: string }): JSX.Element;
};
const ArticleCode: CodeProps = ({ language, code }) => {
  return (
    <pre className='relative'>
      <code
        dangerouslySetInnerHTML={{
          __html: language
            ? hljs.highlight(code, { language }).value
            : hljs.highlightAuto(code).value,
        }}
        className={`language-${language}`}
        lang={language}
      />
      {language && <div className="absolute -top-5 right-6 bg-comment h-5 leading-5 px-3 rounded-t">{language}</div>}
    </pre>
  );
};
export default ArticleCode;

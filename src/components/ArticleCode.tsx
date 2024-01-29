import React from 'react';
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

Prism.manual = true;

type CodeProps = {
  ({ language, code }: { language?: string; code: string }): JSX.Element;
};

const ArticleCode: CodeProps = ({ language = '', code }) => {
  const lang = language.toLowerCase() || 'markup';
  return (
    <pre className='relative'>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(code, Prism.languages[lang], lang),
        }}
        className={`language-${language}`}
        lang={language}
      />
      {language && (
        <div className='absolute -top-5 right-6 h-5 rounded-t bg-muted px-3 leading-5'>
          {language}
        </div>
      )}
    </pre>
  );
};
export default ArticleCode;

'use client';
import classNames from 'classnames';
import { translateMarkdown } from 'utils/translateMarkdown';
import { useEffect } from 'react';
import { updateView } from 'api/article';

const Article = ({ content, id }: { content: string; id: string }) => {
  useEffect(() => {
    updateView({id}).then();
  },[]);
  return (
    <article
      className={classNames('w-full md:col-span-4', 'py-8', 'prose', 'prose-headings:scroll-mt-20')}
      dangerouslySetInnerHTML={{
        __html: translateMarkdown(content),
      }}
    />
  );
};
export default Article;

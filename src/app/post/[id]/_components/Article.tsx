'use client';
import classNames from 'classnames';
import { translateMarkdown } from 'utils/translateMarkdown';
import React from 'react';

const Article = ({ content }: { content: string }) => {
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

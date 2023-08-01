'use client';

import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { renderToStaticMarkup } from 'react-dom/server';
import ArticleCode from 'components/ArticleCode';
import React from 'react';

export const translateMarkdown = (text = '') => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language ) {
    return renderToStaticMarkup(<ArticleCode language={language} code={code} />);
  };
  renderer.image = function (href, title, text) {
    return `<img loading='lazy' src='${href}'  class='zoom' alt='${text}' />`;
  };
  renderer.link = function (href, title, text) {
    return `<a target='_blank' href='${href}'>${text}</a>`;
  };
  renderer.heading = function (text, level, _, slugger) {
    const id = slugger.slug('heading');
    return `
            <h${level} id='${id === 'heading' ? 'heading-0' : id}'>
              <a class="text-default no-underline" href="#${
                id === 'heading' ? 'heading-0' : id
              }">${text}</a>
            </h${level}>`;
  };
  renderer.table = function (header: React.ReactNode, body: React.ReactNode) {
    return `
    <div class='markdown-table'>
      <table>
      ${header}
      ${body}
      </table>
    </div>
    `;
  };
  marked.use(mangle());
  const options = {
    prefix: 'heading-',
  };

  marked.use(gfmHeadingId(options));
  marked.use({
    renderer,
    gfm: true,
    pedantic: false,
    breaks: false,
  });
  return marked.parse(text);
};

export function getTitle(source: string) {
  let nav: string[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    nav.push(`${'#'.repeat(level)} ${text}`);
    return '';
  };
  marked(source, { renderer: renderer });
  return nav;
}

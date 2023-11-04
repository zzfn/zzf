import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
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

const renderer = new marked.Renderer();
renderer.image = function (href, title, text) {
  return `<img loading="lazy" src="${href}"  class="zoom" alt="${text}" />`;
};
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};
renderer.heading = function (text, level) {
  return `
            <h${level} id="${text}">
              <a class="text-default no-underline" href="#${text}">${text}</a>
            </h${level}>`;
};
renderer.table = function (header: React.ReactNode, body: React.ReactNode) {
  return `
    <div class="markdown-table">
      <table>
      ${header}
      ${body}
      </table>
    </div>
    `;
};
marked.use(mangle());

marked.use(
  gfmHeadingId({
    prefix: 'heading-',
  }),
);
marked.use(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  }),
);
marked.use({
  renderer,
  gfm: true,
  pedantic: false,
  breaks: false,
});

export const translateMarkdown = (text = '') => {
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

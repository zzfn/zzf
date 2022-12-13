import { marked } from 'marked';
import { renderToString } from 'react-dom/server';
import ArticleCode from 'components/ArticleCode';
import React from 'react';

export const translateMarkdown = (text = '') => {
  const renderer: Partial<marked.Renderer> = {};
  renderer.code = function (code: string, language: string) {
    return renderToString(<ArticleCode language={language} code={code} />);
  };
  renderer.image = function (href: string, title: string, text: string) {
    return `<img loading='lazy' src='${href}'  class='zoom' alt='${text}' />`;
  };
  renderer.link = function (href: string, title: string, text: string) {
    return `<a target='_blank' href='${href}'>${text}</a>`;
  };
  renderer.heading = function (text: string, level: unknown, _: string, slugger: marked.Slugger) {
    const id = slugger.slug('heading');
    return `
            <h${level} id='${id === 'heading' ? 'heading-0' : id}'>
              ${text}
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
  marked.use({
    renderer,
    gfm: true,
    pedantic: false,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    headerIds: false,
  });
  return marked.parse(text);
};

export function getTitle(source: string) {
  let nav:string[] = []
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level) {
    nav.push(`${'#'.repeat(level)} ${text}`)
    return ''
  }
  marked(source, { renderer: renderer })
  return nav
}

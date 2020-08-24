import marked from 'marked';
import 'highlight.js/styles/rainbow.css';
import '@/styles/markdown.scss'
import { renderToString } from 'react-dom/server'
import Code from '@/components/article/code'
export const translateMarkdown = (text = '') => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language) {
    return renderToString(<Code language={language} code={code} />)
  };
  renderer.image = function (href, title, text) {
    return `<div><img src=${href}  class="zoom" alt=${text} /></div>`;
  }
  return marked(text, {
    renderer: renderer,
    gfm: true,
    pedantic: false,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    headerIds: true,
  });
};

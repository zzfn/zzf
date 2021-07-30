import marked from 'marked';
import { renderToString } from 'react-dom/server';
import Code from 'components/article/code';

export const translateMarkdown = (text = '') => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language) {
    return renderToString(<Code language={language} code={code} />);
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
            <h${level} id=${id === 'heading' ? 'heading-0' : id}>
              ${text}
            </h${level}>`;
  };
  return marked(text, {
    renderer: renderer,
    gfm: true,
    pedantic: false,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    headerIds: false,
  });
};

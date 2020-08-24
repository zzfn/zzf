import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';
import '@/styles/markdown.scss'


export const translateMarkdown = (text = '') => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language) {
    return `<pre><code class="language-${language}" lang=${language}>${
      language ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value
      }</code><a style="position: absolute;right: 10px;top: 10px;color:#8c8c8ccc;border:none">复制代码</a></pre>`;
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

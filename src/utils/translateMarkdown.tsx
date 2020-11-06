import marked from "marked";
import { renderToString } from "react-dom/server";
import Code from "@/components/article/code";
export const translateMarkdown = (text = "") => {
  const renderer = new marked.Renderer();
  renderer.code = function (code, language) {
    return renderToString(<Code language={language} code={code} />);
  };
  renderer.image = function (href, title, text) {
    return `<div><img src=${href}  class="zoom" alt=${text} /></div>`;
  };
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href=${href}>${text}</a>`;
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
    headerIds: true,
  });
};

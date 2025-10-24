import { marked } from 'marked';

marked.use({
  gfm: true,
  pedantic: false,
  breaks: false,
});

export const translateMarkdown = (text = '') => {
  return marked.parse(text);
};

export function getTitle(source: string) {
  const nav: string[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    nav.push(`${'#'.repeat(level)} ${text}`);
    return '';
  };
  marked(source, { renderer: renderer });
  return nav;
}

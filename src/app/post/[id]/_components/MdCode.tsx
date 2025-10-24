import { codeToHtml } from 'shiki';
import Copy from '@/app/post/[id]/_components/Copy';

const SHIKI_PINK = '\u0023ff79c6';
async function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const out = await codeToHtml(code, {
    lang: lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    colorReplacements: {
      [SHIKI_PINK]: 'var(--color-fg-accent)',
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
const MdCode = (props: any) => {
  const lang = props.className?.replace('language-', '');
  if (!props.className) {
    return <code>{props.children}</code>;
  }
  return (
    <>
      <div className='absolute right-2 top-2 z-20 flex justify-end'>
        {lang && <span className='block px-2 group-hover:hidden'>{lang}</span>}
        <Copy code={props.children} />
      </div>
      <CodeBlock code={props.children} lang={lang}></CodeBlock>
    </>
  );
};

export default MdCode;

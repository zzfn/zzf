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
type MdCodeProps = {
  className?: string;
  children: string | string[];
};

const MdCode = ({ className, children }: MdCodeProps) => {
  const code = Array.isArray(children) ? children.join('') : children;
  const lang = className?.replace('language-', '');
  if (!className) {
    return <code>{code}</code>;
  }
  return (
    <>
      <div className='absolute top-2 right-2 z-20 flex justify-end'>
        {lang && <span className='block px-2 group-hover:hidden'>{lang}</span>}
        <Copy code={code} />
      </div>
      <CodeBlock code={code} lang={lang ?? 'text'}></CodeBlock>
    </>
  );
};

export default MdCode;

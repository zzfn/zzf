import { codeToHtml } from 'shiki';
import Copy from '@/app/post/[id]/_components/Copy';
async function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const out = await codeToHtml(code, {
    lang: lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    colorReplacements: {
      '#ff79c6': '#189eff',
    },
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
const MdCode = (props: any) => {
  console.log(props);
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

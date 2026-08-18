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

  return <div className='shiki-container text-xs sm:text-sm font-mono overflow-x-auto p-4 leading-relaxed' dangerouslySetInnerHTML={{ __html: out }} />;
}

type MdCodeProps = {
  className?: string;
  children: string | string[];
};

const MdCode = ({ className, children }: MdCodeProps) => {
  const code = Array.isArray(children) ? children.join('') : children;
  const lang = className?.replace('language-', '');

  if (!className) {
    return <code className='rounded-md border border-border-muted/50 bg-bg-muted/70 px-1.5 py-0.5 font-mono text-xs text-fg-accent'>{code}</code>;
  }

  return (
    <div className='my-6 overflow-hidden rounded-2xl border border-border-muted/60 bg-bg-muted/30 shadow-xs'>
      {/* 顶部控制条 */}
      <div className='flex items-center justify-between border-b border-border-muted/50 bg-bg-muted/40 px-4 py-2 text-xs'>
        {/* macOS 风格窗口三点 */}
        <div className='flex items-center gap-1.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-rose-500/70' />
          <span className='h-2.5 w-2.5 rounded-full bg-amber-500/70' />
          <span className='h-2.5 w-2.5 rounded-full bg-emerald-500/70' />
        </div>

        {/* 语言标签与复制代码 */}
        <div className='flex items-center gap-3'>
          {lang && (
            <span className='font-mono text-[10px] uppercase tracking-wider text-fg-muted font-semibold'>
              {lang}
            </span>
          )}
          <Copy code={code} />
        </div>
      </div>

      <CodeBlock code={code} lang={lang ?? 'text'} />
    </div>
  );
};

export default MdCode;

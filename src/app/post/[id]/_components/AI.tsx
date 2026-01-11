import type { ReactNode } from 'react';

type AIProps = {
  summary: ReactNode;
};

const AI = ({ summary }: AIProps) => {
  return (
    <div className='relative'>
      <div className='rounded-xl bg-[color:var(--bgColor-muted)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-glass)]'>
        <div className='mb-3 flex items-center'>
          <div className='mr-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[color:color-mix(in_srgb,var(--bgColor-accent-emphasis)_12%,transparent)]'>
            <svg viewBox='0 0 24 24' width='22' height='22'>
              <defs>
                <linearGradient id='ai-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='0%' stopColor='var(--color-ansi-red)' />
                  <stop offset='50%' stopColor='var(--color-ansi-green)' />
                  <stop offset='100%' stopColor='var(--color-ansi-blue)' />
                </linearGradient>
              </defs>
              <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'
                fill='url(#ai-gradient)'
              />
            </svg>
          </div>
          <h3 className='m-0 text-base font-semibold text-[color:var(--fgColor-muted)]'>
            AI 智能摘要
          </h3>
        </div>
        <div className='px-1 text-sm leading-[1.7] text-[color:var(--fgColor-muted)]'>
          {summary}
        </div>
      </div>
    </div>
  );
};
export default AI;

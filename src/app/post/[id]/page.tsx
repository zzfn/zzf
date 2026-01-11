import React, { Suspense } from 'react';
import Comment from '@/components/comments/CommentTree';
import { diff, format } from 'utils/time';
import { Alert, Tooltip } from '@/components/ui';
import { notFound } from 'next/navigation';
import ArticleState from './_components/ArticleState';
import { fetchData } from 'services/api';
import classNames from 'classnames';
import type { Article } from 'types/article';
import ArticleCount from './_components/ArticleCount';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import MdImage from './_components/MdImage';
import MdSpace from './_components/MdSpace';
import Loading from 'components/loading';
import MdCode from './_components/MdCode';
import ArticleNav from 'components/ArticleNav';
import remarkGfm from 'remark-gfm';
import CodeSandpack from '@/components/integrations/CodeSandpack';
import AI from './_components/AI';
import type { CSSProperties } from 'react';

async function getData(id: string) {
  return fetchData<Article>({
    endpoint: `/v1/articles/${id}`,
  });
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { title } = await getData(params.id);
  return {
    title: title,
  };
}

const Page = async (props0: { params: Promise<{ id: string }> }) => {
  const params = await props0.params;
  const data = await getData(params.id);
  if (!data) {
    notFound();
  }

  const surfaceVars = {
    '--post-shell-surface': 'color-mix(in srgb, var(--bgColor-default) 92%, transparent)',
    '--post-shell-border': 'color-mix(in srgb, var(--borderColor-muted) 72%, transparent)',
    '--post-shell-shadow':
      '0 32px 64px -44px color-mix(in srgb, var(--fgColor-default) 26%, transparent)',
    '--post-meta-surface': 'color-mix(in srgb, var(--bgColor-muted) 86%, transparent)',
    '--post-meta-border': 'color-mix(in srgb, var(--borderColor-muted) 78%, transparent)',
    '--post-meta-divider': 'color-mix(in srgb, var(--borderColor-muted) 60%, transparent)',
    '--post-comment-surface': 'color-mix(in srgb, var(--bgColor-default) 94%, transparent)',
    '--post-comment-border': 'color-mix(in srgb, var(--borderColor-muted) 70%, transparent)',
  } as CSSProperties;

  return (
    <ArticleState articleState={data}>
      <div
        style={surfaceVars}
        className='mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-12 pb-16 md:grid md:grid-cols-[minmax(0,1fr)_320px] md:gap-10'
      >
        <main className='flex flex-col gap-12 md:col-start-1'>
          <section className='rounded-3xl border border-[color:var(--post-shell-border)] bg-[color:var(--post-shell-surface)] p-8 shadow-[var(--post-shell-shadow)] backdrop-blur-md sm:p-12'>
            <h1 className='text-4xl font-bold tracking-tight text-[color:var(--fgColor-default)] md:text-5xl lg:text-6xl'>
              {data.title}
            </h1>

            <div className='text-fg-muted mt-8 flex flex-wrap items-center gap-3 text-sm'>
              <Tooltip content={format(data.createdAt)}>
                <div className='flex items-center gap-1.5'>
                  <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <time>创建于 {diff(data.createdAt)}</time>
                </div>
              </Tooltip>

              <span className='text-fg-default/40'>•</span>

              <Tooltip content={format(data.updatedAt)}>
                <div className='flex items-center gap-1.5'>
                  <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                  <time>更新于 {diff(data.updatedAt)}</time>
                </div>
              </Tooltip>

              <span className='text-fg-default/40'>•</span>

              <div className='flex items-center gap-1.5'>
                <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
                <span>
                  <ArticleCount id={data.id} />
                </span>
              </div>
            </div>

            {data.summary && (
              <div className='mt-6 border-t border-[color:var(--post-meta-divider)] pt-6'>
                <AI summary={data.summary} />
              </div>
            )}
          </section>
          <article
            className={classNames(
              'mx-auto w-full max-w-2xl rounded-3xl border border-[color:var(--post-shell-border)] bg-[color:var(--post-shell-surface)] px-6 py-8 shadow-[var(--post-shell-shadow)] backdrop-blur-md',
              'prose prose-headings:scroll-mt-24',
            )}
          >
            <Suspense fallback={<Loading />}>
              <MDXRemote
                source={data.content}
                components={{
                  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                    return <a target='_blank' className='text-fg-accent' {...props} />;
                  },
                  img: MdImage,
                  code: MdCode,
                  pre: (props) => <pre className='group relative' {...props} />,
                  Space: MdSpace,
                  Alert: Alert,
                  CodeSandpack: CodeSandpack,
                  table: (props) => (
                    <div className='markdown-table'>
                      <table>{props.children}</table>
                    </div>
                  ),
                }}
                options={{
                  mdxOptions: {
                    rehypePlugins: [],
                    remarkPlugins: [remarkGfm] as any,
                  },
                }}
              />
            </Suspense>
          </article>
          <section className='rounded-3xl border border-[color:var(--post-comment-border)] bg-[color:var(--post-comment-surface)] p-6 shadow-[var(--post-shell-shadow)] backdrop-blur-md sm:p-8'>
            <Comment params={{ objectType: 'article', objectId: data.id }} />
          </section>
        </main>
        <aside className='hidden h-full w-full shrink-0 md:col-start-2 md:block'>
          <ArticleNav source={data.content} />
        </aside>
      </div>
    </ArticleState>
  );
};

export default Page;

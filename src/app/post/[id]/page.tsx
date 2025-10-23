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
import { MDXRemote } from 'next-mdx-remote/rsc';
import MdImage from './_components/MdImage';
import MdSpace from './_components/MdSpace';
import Loading from 'components/loading';
import MdCode from './_components/MdCode';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import ArticleNav from 'components/ArticleNav';
import remarkGfm from 'remark-gfm';
import CodeSandpack from '@/components/integrations/CodeSandpack';
import AI from './_components/AI';
import LinkPreview from '@/components/LinkPreview'; // Added import
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
          <section className='rounded-3xl border border-[color:var(--post-shell-border)] bg-[color:var(--post-shell-surface)] p-6 shadow-[var(--post-shell-shadow)] backdrop-blur-md sm:p-8'>
            <h1 className='text-default text-3xl font-semibold tracking-tight md:text-4xl'>
              {data.title}
            </h1>
            <div className='mt-6 rounded-2xl border border-[color:var(--post-meta-border)] bg-[color:var(--post-meta-surface)] p-4 sm:p-6'>
              <ul className='text-muted flex flex-wrap items-center gap-4 text-sm'>
                <li className='flex items-center gap-2'>
                  <span className='text-default/75'>创建时间</span>
                  <Tooltip content={format(data.createdAt)}>
                    <time>{diff(data.createdAt)}</time>
                  </Tooltip>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-default/75'>更新时间</span>
                  <Tooltip content={format(data.updatedAt)}>
                    <time>{diff(data.updatedAt)}</time>
                  </Tooltip>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-default/75'>浏览量</span>
                  <ArticleCount id={data.id} />
                </li>
              </ul>
              <div className='mt-4 border-t border-[color:var(--post-meta-divider)] pt-4'>
                <AI summary={data.summary} />
              </div>
            </div>
          </section>
          <article
            className={classNames(
              'mx-auto w-full max-w-2xl rounded-3xl border border-[color:var(--post-shell-border)] bg-[color:var(--post-shell-surface)] px-6 py-8 shadow-[var(--post-shell-shadow)] backdrop-blur-md',
              'prose prose-headings:scroll-mt-24',
            )}
          >
            <Suspense fallback={<Loading />}>
              <MDXRemote
                components={{
                  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                    if (
                      props.href &&
                      (props.href.startsWith('http://') || props.href.startsWith('https://'))
                    ) {
                      return (
                        <LinkPreview href={props.href} className='text-accent'>
                          {props.children}
                        </LinkPreview>
                      );
                    }
                    return <a target='_blank' className='text-accent' {...props} />;
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
                source={data.content}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    remarkPlugins: [remarkGfm],
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

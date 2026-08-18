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
import dynamic from 'next/dynamic';
import AI from './_components/AI';
import { Clock, RefreshCw, Eye, Tag, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// 动态导入 CodeSandpack 以减少初始 bundle 大小
const CodeSandpack = dynamic(() => import('@/components/integrations/CodeSandpack'), {
  loading: () => <div className='bg-bg-muted min-h-[400px] w-full animate-pulse rounded-2xl' />,
});

// ISR 缓存配置：每小时重新验证页面
export const revalidate = 3600; // 1 小时

async function getData(id: string) {
  return fetchData<Article>({
    endpoint: `/v1/articles/${id}`,
  });
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await getData(params.id);
  return {
    title: data?.title ? `${data.title} · 奇趣生活实验室` : '文章详情',
    description: data?.summary || data?.title,
  };
}

const Page = async (props0: { params: Promise<{ id: string }> }) => {
  const params = await props0.params;
  const data = await getData(params.id);
  if (!data) {
    notFound();
  }

  return (
    <ArticleState articleState={data}>
      <div className='min-h-screen pb-20'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-6 md:grid md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_320px]'>
          <main className='flex flex-col gap-6 min-w-0'>
            {/* 返回面包屑 */}
            <div className='flex items-center justify-between'>
              <Link
                href='/post'
                className='group inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg-default'
              >
                <ArrowLeft size={14} className='transition-transform group-hover:-translate-x-1' />
                <span>返回文章列表</span>
              </Link>
              <div className='inline-flex items-center gap-1 rounded-full border border-border-muted/60 bg-bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono text-fg-muted'>
                <Tag size={11} />
                <span>{data.tag}</span>
              </div>
            </div>

            {/* 文章顶部信息卡片 */}
            <header className='bento-card relative overflow-hidden p-6 sm:p-10'>
              {/* 背景环境柔光 */}
              <div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent blur-2xl dark:from-purple-500/20' />

              <h1 className='text-2xl font-bold leading-tight tracking-tight text-fg-default sm:text-3xl lg:text-4xl'>
                {data.title}
              </h1>

              {/* 元数据行 */}
              <div className='mt-6 flex flex-wrap items-center gap-4 border-t border-border-muted/40 pt-5 text-xs text-fg-muted'>
                <Tooltip content={format(data.createdAt)}>
                  <div className='flex items-center gap-1.5 font-mono'>
                    <Clock size={13} className='text-fg-muted' />
                    <span>发布于 {diff(data.createdAt)}</span>
                  </div>
                </Tooltip>

                <Tooltip content={format(data.updatedAt)}>
                  <div className='flex items-center gap-1.5 font-mono'>
                    <RefreshCw size={13} className='text-fg-muted' />
                    <span>更新于 {diff(data.updatedAt)}</span>
                  </div>
                </Tooltip>

                <div className='flex items-center gap-1.5 font-mono'>
                  <Eye size={13} className='text-fg-muted' />
                  <span>
                    <ArticleCount id={data.id} /> 次阅读
                  </span>
                </div>
              </div>

              {/* AI 智能摘要 */}
              {data.summary && <AI summary={data.summary} />}
            </header>

            {/* 文章主体内容 */}
            <article className='bento-card overflow-hidden p-6 sm:p-10'>
              <div
                className={classNames(
                  'prose max-w-none text-fg-default leading-relaxed',
                  'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-fg-default',
                  'prose-h2:text-2xl prose-h2:border-b prose-h2:border-border-muted/40 prose-h2:pb-3 prose-h2:mt-10',
                  'prose-h3:text-xl prose-h3:mt-8',
                  'prose-p:text-[15px] prose-p:leading-7 prose-p:my-4',
                  'prose-a:text-fg-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline',
                  'prose-blockquote:border-l-2 prose-blockquote:border-fg-accent prose-blockquote:bg-bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-blockquote:text-fg-muted',
                  'prose-code:font-mono prose-code:text-xs prose-code:bg-bg-muted/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md',
                  'prose-img:rounded-2xl prose-img:border prose-img:border-border-muted/50 prose-img:shadow-sm',
                )}
              >
                <Suspense fallback={<Loading />}>
                  <MDXRemote
                    source={data.content}
                    components={{
                      a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                        return <a target='_blank' rel='noreferrer' className='text-fg-accent' {...props} />;
                      },
                      img: MdImage,
                      code: MdCode,
                      pre: (props) => <pre className='group relative rounded-2xl overflow-hidden' {...props} />,
                      Space: MdSpace,
                      Alert: Alert,
                      CodeSandpack: CodeSandpack,
                      table: (props) => (
                        <div className='markdown-table my-6 overflow-x-auto rounded-xl border border-border-muted/60'>
                          <table className='w-full text-left text-sm'>{props.children}</table>
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
              </div>
            </article>

            {/* 讨论与评论区 */}
            <section className='bento-card p-6 sm:p-8'>
              <div className='mb-6 flex items-center gap-2 border-b border-border-muted/50 pb-3'>
                <MessageSquare size={16} className='text-fg-accent' />
                <h2 className='text-base font-bold text-fg-default'>讨论与反馈</h2>
              </div>
              <Comment params={{ objectType: 'article', objectId: data.id }} />
            </section>
          </main>

          {/* 侧边栏 */}
          <aside className='hidden md:block'>
            <div className='sticky top-24'>
              <div className='bento-card p-5'>
                <ArticleNav source={data.content} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ArticleState>
  );
};

export default Page;

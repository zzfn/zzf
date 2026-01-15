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
import { ClayCard } from '@/components/ui/ClayCard';
import { Sparkles, BookOpen, Clock, RefreshCw, Eye } from 'lucide-react';

async function getData(id: string) {
  return fetchData<Article>({
    endpoint: `/v1/articles/${id}`,
  });
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await getData(params.id);
  return {
    title: data?.title || '文章详情',
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
      <div style={surfaceVars} className='min-h-screen bg-[color:var(--bgColor-default)] pb-20'>
        {/* 背景装饰 */}
        <div className='pointer-events-none absolute top-0 left-0 -z-10 h-[500px] w-full overflow-hidden'>
          <div className='absolute top-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-pink-400 opacity-10 blur-[100px]' />
          <div className='absolute top-[-5%] right-[-5%] h-[30%] w-[30%] rounded-full bg-blue-400 opacity-10 blur-[100px]' />
        </div>

        <div className='mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-10 md:grid md:grid-cols-[minmax(0,1fr)_340px]'>
          <main className='flex flex-col gap-10 md:col-start-1'>
            {/* 文章顶部信息卡片 */}
            <ClayCard color='blue' className='relative overflow-visible !p-8 md:!p-12'>
              <div className='mb-6 flex w-fit items-center gap-2 rounded-full bg-white/40 px-3 py-1 text-xs font-bold text-blue-600'>
                <Sparkles size={14} /> 深度探索
              </div>

              <h1 className='text-fg-default mb-8 text-4xl leading-[1.2] font-bold tracking-tight md:text-5xl lg:text-6xl'>
                {data.title}
              </h1>

              <div className='text-fg-muted flex flex-wrap items-center gap-6 border-t border-white/20 pt-8 text-sm font-bold'>
                <Tooltip content={format(data.createdAt)}>
                  <div className='flex items-center gap-2'>
                    <Clock size={16} className='text-blue-500' />
                    <span>创建于 {diff(data.createdAt)}</span>
                  </div>
                </Tooltip>

                <Tooltip content={format(data.updatedAt)}>
                  <div className='flex items-center gap-2'>
                    <RefreshCw size={16} className='text-pink-500' />
                    <span>更新于 {diff(data.updatedAt)}</span>
                  </div>
                </Tooltip>

                <div className='flex items-center gap-2'>
                  <Eye size={16} className='text-green-500' />
                  <span>
                    <ArticleCount id={data.id} /> 次阅读
                  </span>
                </div>
              </div>

              {data.summary && (
                <div className='mt-10'>
                  <AI summary={data.summary} />
                </div>
              )}
            </ClayCard>

            {/* 文章主体内容 */}
            <ClayCard className='overflow-hidden !p-0'>
              <article
                className={classNames(
                  'prose prose-headings:scroll-mt-24 max-w-none px-6 py-10 md:px-12 md:py-16',
                  'prose-p:text-lg prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-fg-default',
                  'prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline',
                  'prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:border-4 prose-img:border-white/50',
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
            </ClayCard>

            {/* 评论区 */}
            <ClayCard color='default' className='!p-8'>
              <h2 className='mb-8 flex items-center gap-3 text-2xl font-bold'>
                <BookOpen className='text-pink-500' /> 讨论与反馈
              </h2>
              <Comment params={{ objectType: 'article', objectId: data.id }} />
            </ClayCard>
          </main>

          {/* 侧边栏 */}
          <aside className='flex flex-col gap-8'>
            <ClayCard color='yellow' className='!p-6'>
              <h3 className='mb-4 flex items-center gap-2 text-lg font-bold'>
                <Sparkles size={18} className='text-yellow-600' /> 内容导航
              </h3>
              <div className='custom-scrollbar max-h-[60vh] overflow-y-auto'>
                <ArticleNav source={data.content} />
              </div>
            </ClayCard>
          </aside>
        </div>
      </div>
    </ArticleState>
  );
};

export default Page;

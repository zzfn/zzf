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
import { Card } from '@/components/ui/ClayCard';
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

  return (
    <ArticleState articleState={data}>
      <div className='bg-bg-default min-h-screen pb-20'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-10 md:grid md:grid-cols-[minmax(0,1fr)_340px]'>
          <main className='flex flex-col gap-10 md:col-start-1'>
            {/* 文章顶部信息卡片 */}
            <Card className='relative overflow-visible !p-8 md:!p-12'>
              <h1 className='text-fg-default mb-8 text-4xl leading-[1.2] font-semibold tracking-tight md:text-5xl lg:text-6xl'>
                {data.title}
              </h1>

              <div className='text-fg-muted border-border-muted flex flex-wrap items-center gap-6 border-t pt-8 text-sm font-medium'>
                <Tooltip content={format(data.createdAt)}>
                  <div className='flex items-center gap-2'>
                    <Clock size={16} className='text-fg-muted' />
                    <span>创建于 {diff(data.createdAt)}</span>
                  </div>
                </Tooltip>

                <Tooltip content={format(data.updatedAt)}>
                  <div className='flex items-center gap-2'>
                    <RefreshCw size={16} className='text-fg-muted' />
                    <span>更新于 {diff(data.updatedAt)}</span>
                  </div>
                </Tooltip>

                <div className='flex items-center gap-2'>
                  <Eye size={16} className='text-fg-muted' />
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
            </Card>

            {/* 文章主体内容 */}
            <Card className='overflow-hidden !p-0'>
              <article
                className={classNames(
                  'prose prose-headings:scroll-mt-24 max-w-none px-6 py-10 md:px-12 md:py-16',
                  'prose-p:text-lg prose-p:leading-relaxed prose-headings:font-semibold prose-headings:text-fg-default',
                  'prose-a:text-fg-accent prose-a:no-underline hover:prose-a:underline',
                  'prose-img:rounded-lg prose-img:border prose-img:border-border-muted',
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
            </Card>

            {/* 评论区 */}
            <Card className='!p-8'>
              <h2 className='mb-8 flex items-center gap-3 text-2xl font-semibold'>
                <BookOpen className='text-fg-muted' /> 讨论与反馈
              </h2>
              <Comment params={{ objectType: 'article', objectId: data.id }} />
            </Card>
          </main>

          {/* 侧边栏 */}
          <aside className='flex flex-col gap-8'>
            <Card className='!p-6'>
              <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <Sparkles size={18} className='text-fg-muted' /> 内容导航
              </h3>
              <div className='custom-scrollbar max-h-[60vh] overflow-y-auto'>
                <ArticleNav source={data.content} />
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </ArticleState>
  );
};

export default Page;

import React from 'react';
import Comment from './_components/Comment';
import { diff, format } from 'utils/time';
import { Tooltip } from '@oc/design';
import { notFound } from 'next/navigation';
import ArticleState from './_components/ArticleState';
import ArticleNav from 'components/ArticleNav';
import { fetchData } from 'models/api';
import classNames from 'classnames';
import { translateMarkdown } from 'utils/translateMarkdown';
import type { Article } from 'types/article';

async function getData(id: string) {
  return fetchData<Article>({
    endpoint: `/v1/articles/${id}`,
  });
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { title } = await getData(params.id);
  return {
    title: title,
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const contentHtml = translateMarkdown(data.content);
  if (!data) {
    notFound();
  }
  return (
    <ArticleState articleState={data}>
      <div className='w-full grid-cols-5 gap-x-2 md:grid'>
        <main className='col-span-4 w-full shrink grow-0 basis-full'>
          <h1 className='pt-8 text-3xl'>{data.title}</h1>
          <ul className='my-4 flex gap-x-2 rounded bg-muted p-6 text-sm text-muted'>
            <label>创建时间</label>
            <Tooltip content={format(data.createdAt)}>
              <time>{diff(data.createdAt)}</time>
            </Tooltip>
            <label>更新时间</label>
            <Tooltip content={format(data.updatedAt)}>
              <time>{diff(data.updatedAt)}</time>
            </Tooltip>
            <label>浏览量</label>
            <span>{data.viewCount}</span>
          </ul>
          <article
            className={classNames(
              'w-full md:col-span-4',
              'py-8',
              'prose',
              'prose-headings:scroll-mt-20',
            )}
            dangerouslySetInnerHTML={{
              __html: contentHtml,
            }}
          />
          <Comment params={{ objectType: 'article', objectId: data.id }} />
        </main>
        <aside className='grow-1 col-span-1 hidden h-full w-full shrink-0  transform-gpu md:block'>
          <ArticleNav source={data.content} />
        </aside>
      </div>
    </ArticleState>
  );
};

export default Page;

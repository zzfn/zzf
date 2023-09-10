import React from 'react';
import ArticleContent from './_components/Article';
import Comment from './_components/Comment';
import { diff, format } from 'utils/time';
import { Tooltip } from '@oc/design';
import { notFound } from 'next/navigation';
import ArticleState from './_components/ArticleState';
import ArticleNav from 'components/ArticleNav';
import { fetchData } from "models/api";
import type { Article } from 'types/article';

async function getData(id: string) {
  return fetchData<Article>({
    endpoint: `/v1/articles/${id}`,
  });
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  if (!data) {
    notFound();
  }
  return (
    <ArticleState articleState={data}>
      <div className='md:grid grid-cols-5 w-full gap-x-2'>
        <main className='shrink grow-0 basis-full w-full col-span-4'>
          <h1 className='pt-8 text-3xl'>{data.title}</h1>
          <ul className='flex gap-x-2 my-4 text-sm text-muted bg-muted p-6 rounded'>
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
          <ArticleContent content={data.content} />
          <Comment
            params={{
              objectType: 'article',
              objectId: data.id,
            }}
          />
        </main>
        <aside className='shrink-0 grow-1 col-span-1'>
          <ArticleNav source={data.content} />
        </aside>
      </div>
    </ArticleState>
  );
};

export default Page;

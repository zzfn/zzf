import { getArticle } from 'api/article';
import React from 'react';
import Article from './_components/Article';
import Comment from "./_components/Comment";

const Page = async ({ params }: { params: { id: string } }) => {
  const { data, code } = await getArticle({ id: params.id });
  return (
    <>
      <h1 className='pt-8 text-3xl'>{data.title}</h1>
      <Article content={data.content} />
      <Comment id={data.id}/>
    </>
  );
};

export default Page;

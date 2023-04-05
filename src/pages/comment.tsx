import type { NextPageWithLayout } from './_app';
import Comments from 'features/comments/Comments';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';
import React from 'react';

const Comment: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>留言</h1>
      <Comments postId='message' />
    </>
  );
};
export default Comment;

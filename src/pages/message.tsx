import type { NextPageWithLayout } from './_app';
import Evaluation from 'features/comments/Comments';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';
import React from 'react';

const Message: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>留言</h1>
      <Evaluation id='message' />
    </>
  );
};
export default Message;

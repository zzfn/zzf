import type { NextPageWithLayout } from './_app';
import Evaluation from 'features/Evaluation';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';
import { Card } from '@oc/design';
import React from 'react';

const Message: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>留言</h1>
      <Card>
        <Evaluation id='message' />
      </Card>
    </>
  );
};
export default Message;

import type { NextPageWithLayout } from './_app';
import Evaluation from 'features/Evaluation';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';

const Message: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <Evaluation id='message' />
    </>
  );
};
export default Message;

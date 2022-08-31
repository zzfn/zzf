import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import NoAsideLayout from 'components/layout/NoAsideLayout';
import Evaluation from '../components/Evaluation';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';

const Message: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <Evaluation id='' />
    </>
  );
};
export default Message;

Message.getLayout = function (page: ReactElement) {
  return <NoAsideLayout>{page}</NoAsideLayout>;
};
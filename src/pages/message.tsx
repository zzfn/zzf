import type { NextPageWithLayout } from './_app';
import Evaluation from 'features/Evaluation';
import Head from 'next/head';
import { getTitle } from 'utils/getTitle';
import { Card } from "@oc/design";

const Message: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('留言')}</title>
      </Head>
      <Card>
        <Evaluation id='message' />
      </Card>
    </>
  );
};
export default Message;

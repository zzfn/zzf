import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import NoAsideLayout from 'components/layout/NoAsideLayout';

const Message: NextPageWithLayout = () => {
  return <div>留言</div>;
};
export default Message;

Message.getLayout = function (page: ReactElement) {
  return <NoAsideLayout>{page}</NoAsideLayout>;
};

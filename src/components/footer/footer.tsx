import React from 'react';
import dayjs from 'dayjs';
import { Layout } from '@zzf/design';
import classNames from 'classnames';

function Footer(): JSX.Element {
  return (
    <Layout.Footer className={classNames('flex', 'flex-col', 'items-center', 'py-8', 'leading-6')}>
      <div>2020-{dayjs().format('YYYY')}</div>
      <div>Powered by zzfn</div>
      <div>苏ICP备18059856号</div>
    </Layout.Footer>
  );
}

export default Footer;

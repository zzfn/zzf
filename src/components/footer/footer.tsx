import React from 'react';
import styles from './footer.module.scss';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Layout } from '@zzf/design';

function Footer(): JSX.Element {
  return (
    <Layout.Footer className={styles.footer}>
      <div>2020-{dayjs().format('YYYY')}</div>
      <div>Powered by zzfn</div>
      <div>苏ICP备18059856号</div>
      <div>email: admin@annyyy.com</div>
    </Layout.Footer>
  );
}

export default Footer;

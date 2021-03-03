import React from 'react';
import styles from './footer.module.scss';
import dayjs from 'dayjs';
import Link from 'next/link';
function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div>2020-{dayjs().format('YYYY')}</div>
      <div>Powered by zzfn</div>
      <div>苏ICP备18059856号</div>
      <Link href={'/friends'}>
        <a className={styles.friends} target={'_blank'}>
          友情链接
        </a>
      </Link>
    </footer>
  );
}

export default Footer;

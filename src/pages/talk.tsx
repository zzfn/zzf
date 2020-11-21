import React from 'react';
import styles from '@/styles/tag.module.scss';
import Head from 'next/head';
import { listTags } from 'services/article';

export default function Talk({ serverProps }): JSX.Element {
  return (
    <div className={styles.tagWrap}>
      <Head>
        <title>zzf~说说</title>
      </Head>
      待开发
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await listTags({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};

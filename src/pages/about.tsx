import React from 'react';
import Head from 'next/head';
import styles from 'styles/about.module.scss';
export default function About({ serverProps }): JSX.Element {
  return (
    <div className={styles.about}>
      <Head>
        <title>zzf~关于</title>
      </Head>
      <p>博客前端采用react+nextjs完成,后端采用springboot+MyBatis-Plus完成，数据库采用mysql</p>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      serverProps: {},
    },
    revalidate: 1,
  };
};

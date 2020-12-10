import React from 'react';
import Head from 'next/head';
import styles from 'styles/about.module.scss';

export default function About({ serverProps }): JSX.Element {
  return (
    <div className={styles.about}>
      <Head>
        <title>zzf~关于</title>
      </Head>
      <ul>
        <li>博客前端采用react+nextjs完成,后端采用springboot+MyBatis-Plus完成，数据库采用mysql</li>
        <li>支持跟随系统深色与浅色模式</li>
        <li>2020.12.10--文章搜索功能集成Elasticsearch7.10.0</li>
        <li>计划中》》》spring cloud 分模块部署</li>
      </ul>
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

import React from 'react';
import Head from 'next/head';
import styles from 'styles/about.module.scss';

export default function About({ serverProps }): JSX.Element {
  return (
    <div className={styles.about}>
      <Head>
        <title>关于~zzf</title>
      </Head>
      <header>zzfn 上次修改2020.12.20</header>
      <article>
        <ul>
          <li>博客前端采用react+nextjs完成,无ui框架,逐步减少依赖,手动实现各个依赖</li>
          <li>后端采用springboot+MyBatis-Plus完成，数据库采用mysql,缓存使用redis</li>
          <li>支持跟随系统深色与浅色模式</li>
          <li>2020.12.10--文章搜索功能集成Elasticsearch7.10.0</li>
          <li>2020.12.19--后端采用微服务架构</li>
        </ul>
      </article>
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

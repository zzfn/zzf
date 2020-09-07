import React, { useEffect } from "react";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import "markdown-navbar/dist/navbar.css";
import { listTags } from "@/services/article";
export default function About({ serverProps }) {
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~更新日志</title>
      </Head>
      <ul>
        <li>2020-08-18～网站上线</li>
        <li>2020-08-24～网站基础功能完成</li>
        <li>2020-09-03～网站和后端改用docker部署</li>
        <li>2020-09-07～网站和后端改用取消docker部署</li>
      </ul>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await listTags({});
  return {
    props: {
      serverProps: data,
    },
  };
};

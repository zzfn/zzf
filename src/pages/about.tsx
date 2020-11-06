import React from "react";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import "markdown-navbar/dist/navbar.css";

export default function About({ serverProps }) {
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~关于</title>
      </Head>
      <h3 style={{textAlign:'center'}}>前端github https://github.com/zzfn/zzf</h3>
      <h3 style={{textAlign:'center'}}>后端 https://github.com/zzfn/jello</h3>
      <h3 style={{textAlign:'center'}}>该系统采用 react typescript nextjs 编写。</h3>
      <h3 style={{textAlign:'center'}}>后端采用 springboot mysql redis 编写。</h3>
    </div>
  );
}

import React, { useEffect } from "react";
import { getArticle, listArchives } from "@/services/article";
import { translateMarkdown } from "@/utils/translateMarkdown.tsx";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { Affix } from "antd";
import moment from "moment";

export default function ArticleDetail({ serverProps, name }) {
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~{name}</title>
      </Head>
      <h2>{name}</h2>
      <ul>
        {serverProps.map((item) => (
          <li key={item.id}>
            <span style={{ color: "#8a8a8a" }}>
              {moment(item.createTime).format("YYYY-MM-DD")}
            </span>
            -<span style={{ color: "#4183c4" }}>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const {
    params: { id },
    query: { name },
  } = context;
  const { data } = await listArchives({ code: id });
  return {
    props: {
      serverProps: data,
      name,
    },
  };
};

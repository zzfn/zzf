import React from "react";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import { listTags } from "@/services/article";
import Link from "next/link";

export default function About({ serverProps }) {
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~标签</title>
      </Head>
      {serverProps.map((item) => (
        <div
          key={item.code}
          style={{ margin: "20px", display: "inline-block" }}
        >
          <Link href={`/tag/${item.code}?name=${item.tag}`}>
            <span style={{ cursor: "pointer" }} color="#108ee9">
              {item.tag}-{item.count}
            </span>
          </Link>
        </div>
      ))}
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

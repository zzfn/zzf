import React, { useEffect } from "react";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import "markdown-navbar/dist/navbar.css";
import { listTags } from "@/services/article";
import { Tag, Badge } from "antd";
import Link from "next/link";
export default function About({ serverProps }) {
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~标签</title>
      </Head>
      <img
        style={{ width: "100%" }}
        src="http://zzf-oss.annyyy.com/1598245775968FEzbxi.jpeg"
        alt="bg"
      />
      {serverProps.map((item) => (
        <div
          key={item.code}
          style={{ margin: "20px", display: "inline-block" }}
        >
          <Link href={`/tag/${item.code}?name=${item.tag}`}>
            <Badge count={item.count}>
              <Tag style={{ cursor: "pointer" }} color="#108ee9">
                {item.tag}
              </Tag>
            </Badge>
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

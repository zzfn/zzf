import React from "react";
import styles from "@/styles/archive.module.scss";
import Head from "next/head";
import { listArchives } from "@/services/article";
import Link from "next/link";
import dayjs from "dayjs";

export default function About({ serverProps }) {
  return (
    <div className={styles.archiveWrap}>
      <Head>
        <title>zzf~归档</title>
      </Head>
      <div>
        <ul>
          {serverProps.map((item) => (
            <li key={item.id}>
              <span style={{ color: "#8a8a8a" }}>
                {dayjs(item.createTime).format("YYYY_MM_DD")}
              </span>
              -
              <Link href={`/article/${item.id}`}>
                <a style={{ color: "#4183c4" }}>{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await listArchives({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};

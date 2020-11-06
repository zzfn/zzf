import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import ZImg from "com/common/zImg";
import { listArticles } from "@/services/article";
import ArticleCard from "com/article/articleCard";
import { selectSysConfig } from "@/services/common";

export default function Home(props): JSX.Element {
  const { serverProps, bg } = props;
  const [total, setTotal] = useState(serverProps.total);
  const [page, setPage] = useState(serverProps.page);
  const [records, setRecords] = useState(serverProps.records);

  useEffect(() => {
    listArticles({ pageNumber: page, pageSize: 10 }).then(({ data }) => {
      setTotal(data.total);
      setPage(data.current);
      setRecords(data.records);
    });
  }, [page]);
  return (
    <div className={styles.home}>
      <Head>
        <title>zzf~首页</title>
      </Head>
      <ZImg className={styles.bg} src={bg?.value} />
      {records.map((item: Article) => (
        <ArticleCard key={item.id} dataSource={item} />
      ))}
      <span onClick={() => setPage(page - 1)}>上一页</span>
      <span onClick={() => setPage(page + 1)}>下一页</span>
    </div>
  );
}
export const getServerSideProps = async () => {
  const num = 1;
  const size = 10;
  const { data } = await listArticles({ pageNumber: num, pageSize: size });
  const { data: data0 } = await selectSysConfig({ field: "bg" });
  return {
    props: {
      serverProps: data,
      bg: data0,
    },
  };
};

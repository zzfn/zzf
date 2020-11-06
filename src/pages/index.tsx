import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import { listArticles } from "@/services/article";
import ArticleCard from "com/article/articleCard";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home(props): JSX.Element {
  const { serverProps } = props;
  const [total, setTotal] = useState(serverProps.total);
  const [val, setVal] = useState<string>();
  const [page, setPage] = useState(serverProps.page);
  const [records, setRecords] = useState(serverProps.records);
  const de = useDebounce(change, 500);
  function change(v) {
    listArticles({ pageNumber: page, pageSize: 10, title: val }).then(
      ({ data }) => {
        setTotal(data.total);
        setPage(data.current);
        setRecords(data.records);
      }
    );
  }
  useEffect(() => {
    de();
  }, [page, val]);

  return (
    <div className={styles.home}>
      <Head>
        <title>zzf~首页</title>
      </Head>
      <input
        value={val}
        onChange={(event) => setVal(event.target.value)}
        type="text"
      />
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
  return {
    props: {
      serverProps: data,
    },
  };
};

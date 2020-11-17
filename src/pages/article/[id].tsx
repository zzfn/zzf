import React from "react";
import { getArticle, listArchives, updateViews } from "@/services/article";
import { translateMarkdown } from "@/utils/translateMarkdown.tsx";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import MarkdownNavbar from "markdown-navbar";
import Progress from "com/article/Progress";

export default function ArticleDetail(props) {
  const { serverProps = {} } = props;
  return (
    <div className={styles.detail}>
      <Head>
        <title>zzf~{serverProps.title}</title>
      </Head>
      <Progress />
      <div className={styles.left}>
        <div className={styles.title}>
          <h1>{serverProps.title}</h1>
        </div>
        <div className={styles.tip}>
          <ul>
            <li>
              <span>标签</span>
              {serverProps.tagDesc}
            </li>
            <li>
              <span>阅读量</span>
              {serverProps.viewCount}
            </li>
            <li>
              <span>发布于</span>
              {serverProps.createTime}
            </li>
          </ul>
        </div>
        <div
          className={["markdown-template", styles.content].join(" ")}
          dangerouslySetInnerHTML={{
            __html: translateMarkdown(serverProps.content),
          }}
        />
      </div>
      <div className={styles.sidebar}>
        <MarkdownNavbar
          ordered={false}
          className={"markdown-nav"}
          headingTopOffset={80}
          source={serverProps.content}
        />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await listArchives({});
  const paths = data.map((_) => ({ params: { id: _.id } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const { data } = await getArticle({ id });
  await updateViews({ id });

  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
}

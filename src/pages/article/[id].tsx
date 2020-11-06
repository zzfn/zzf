import { getArticle } from "@/services/article";
import { translateMarkdown } from "@/utils/translateMarkdown.tsx";
import styles from "@/styles/article.module.scss";
import Head from "next/head";
import MarkdownNavbar from "markdown-navbar";
import Progress from "com/article/Progress";

export default function ArticleDetail({ serverProps }) {
  return (
    <div className={styles.detail}>
      <Progress />
      <Head>
        <title>zzf~{serverProps.title}</title>
      </Head>
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
      <MarkdownNavbar
        ordered={false}
        className={"markdown-nav"}
        headingTopOffset={80}
        source={serverProps.content}
      />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "33e2b0b1ca8301270159d2f40e83a7d9" } }],
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const { data } = await getArticle({ id });

  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};

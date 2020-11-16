import React, { useEffect } from "react";
import Head from "next/head";
import "@/styles/globals.scss";
import styles from "@/styles/app.module.scss";
import "markdown-navbar/dist/navbar.css";
import "../styles/markdown.scss";
import "highlight.js/styles/rainbow.css";

import Link from "next/link";
import { DatabaseOutlined, HomeOutlined, TagOutlined } from "@ant-design/icons";
import Zooming from "zooming";
import { Canvas } from "../components/canvas/canvas";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const zooming = new Zooming({
      enableGrab: false,
      bgColor: "rgb(0, 0, 0)",
      bgOpacity: "0.5",
    });
    zooming.listen(".zoom");
  }, []);
  return (
    <>
      <Head>
        <title>zzf</title>
      </Head>
      <Canvas />
      <header className={styles.header}>
        <div className={styles["header_main"]}>
          <Link href="/">
            <img
              className={styles.logo}
              src={"/static/img/img-3.png"}
              alt="logo"
            />
          </Link>
          <nav>
            <Link href="/">
              <span>
                <HomeOutlined style={{ color: "#00a7de" }} />
                <a>首页</a>
              </span>
            </Link>
            <Link href="/archive">
              <span>
                <DatabaseOutlined style={{ color: "#00a7de" }} />
                <a>归档</a>
              </span>
            </Link>
            <Link href="/tag">
              <span>
                <TagOutlined style={{ color: "#00a7de" }} />
                <a>标签</a>
              </span>
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <div>2020</div>
        <div>Powered by Zzf</div>
        <div>苏ICP备18059856号</div>
      </footer>
    </>
  );
}

export default MyApp;

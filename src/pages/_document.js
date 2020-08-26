import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh">
        <Head>
          <title>zzf</title>
          <link rel="icon" href="/static/favicon.ico" />
          <meta name="keywords" content="vue,react,正则表达式,webpack,docker" />
          <meta name="description" content="zzf的个人网站,记录个人学习" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

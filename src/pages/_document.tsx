import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='zh'>
        <Head>
          <link rel='shortcut icon' href={'/static/favicon.ico'} />
          <link rel='icon' href={'/static/favicon.ico'} />
          <meta
            name='keywords'
            content='前端博客,个人博客,javascript,vue,react,正则表达式,webpack,docker,zzfzzf,zzf,面试'
          />
          <meta name='description' content='zzf的个人网站,记录个人学习' />
          <meta name='theme-color' content='#ffffff' />
          <script async src={'//at.alicdn.com/t/font_2620815_urrs70zp8t.js'} />
        </Head>
        <body onTouchStart={() => {}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

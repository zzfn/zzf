import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Html lang='zh'>
        <Head>
          <link rel='icon' href='/static/favicon.ico' />
          <meta
            name='keywords'
            content='前端博客,个人博客,javascript,vue,react,正则表达式,webpack,docker'
          />
          <meta
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;'
            name='viewport'
          />
          <meta name='description' content='zzf的个人网站,记录个人学习' />
          <meta name='theme-color' content='#ffffff' />
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

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  getAnalyticsTag = () => {
    return {
      __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ed2dea228a6c252969d46cf1aad258a6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
    };
  };

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
          <meta name='description' content='zzf的个人网站,记录个人学习' />
          <meta name='theme-color' content='#ffffff' />
          <script dangerouslySetInnerHTML={this.getAnalyticsTag()} />
        </Head>
        <body className={'light'}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

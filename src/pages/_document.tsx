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
  getGoogle = () => {
    return {
      __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QHRFL84469');`,
    };
  };

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='zh'>
        <Head>
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link rel='icon' href='/static/favicon.ico' />
          <meta
            name='keywords'
            content='前端博客,个人博客,javascript,vue,react,正则表达式,webpack,docker,zzfzzf,zzf,面试'
          />
          <meta name='description' content='zzf的个人网站,记录个人学习' />
          <meta name='theme-color' content='#ffffff' />
          <script async src='https://www.googletagmanager.com/gtag/js?id=G-QHRFL84469' />
          <script async src='https://at.alicdn.com/t/font_2620815_mv6ezh2dvis.js' />
          <script dangerouslySetInnerHTML={this.getGoogle()} />
          <script dangerouslySetInnerHTML={this.getAnalyticsTag()} />
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

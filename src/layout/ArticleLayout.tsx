import { Layout } from '@oc/design';
import Header from './header';
import Footer from './footer';
import { Progress } from '@oc/design';
import type { ReactNode } from 'react';
import React from 'react';
import ArticleNav from "../components/ArticleNav";

function ArticleLayout({ children, source }: { children: ReactNode; source: string }) {
  return (
    <>
      <Progress />
      <Layout className='min-h-screen'>
        <Layout.Header className='container px-3 max-w-4xl'>
          <Header />
        </Layout.Header>
        <Layout.Main className='container py-3 px-3 max-w-4xl md:grid md:grid-cols-5 gap-x-4'>
          {children}
          <ArticleNav source={source} />
        </Layout.Main>
        <Layout.Footer className='container'>
          <Footer />
        </Layout.Footer>
      </Layout>
    </>
  );
}

export default ArticleLayout;

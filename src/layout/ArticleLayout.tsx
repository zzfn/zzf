import { Layout } from '@oc/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import ArticleNav from 'components/ArticleNav';

function DefaultLayout({ children, source }: { children: ReactNode; source: string }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <ArticleNav source={source} />
        <Layout.Center className='w-full'>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

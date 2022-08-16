import { Layout } from '@dekopon/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import Nav from '../article/nav';

function DefaultLayout({ children, source }: { children: ReactNode; source: string }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside>
          <Nav source={source} />
        </Layout.Aside>
        <Layout.Center className='w-full'>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer className='container'>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

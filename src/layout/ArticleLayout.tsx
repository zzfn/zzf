import { Layout } from '@ootd/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import Nav from '../components/article/nav';
import Aside from './Aside';

function DefaultLayout({ children, source }: { children: ReactNode; source: string }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside className='hidden md:block'>
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

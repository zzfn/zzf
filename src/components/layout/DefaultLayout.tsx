import { Layout } from '@dekopon/design';
import Header from './header';
import MobileHeader from './MobileHeader';
import Aside from './Aside';
import Footer from './footer';
import type { ReactNode } from 'react';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
        <MobileHeader />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside>
          <Aside />
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

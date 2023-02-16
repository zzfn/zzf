import { Layout } from '@oc/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import Aside from './Aside';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Layout.Center>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

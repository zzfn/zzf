import { Layout } from '@oc/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container px-3 max-w-4xl'>
        <Header />
      </Layout.Header>
      <Layout.Main className='container py-3 px-3 max-w-4xl'>
        {children}
      </Layout.Main>
      <Layout.Footer className='container'>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

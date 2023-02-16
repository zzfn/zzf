import { Layout } from '@oc/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';

function DefaultNoBg({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Layout.Center className='w-full'>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultNoBg;

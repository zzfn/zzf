import { Layout } from '@dekopon/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';

function NoAsideLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Center className='container w-full'>{children}</Layout.Center>
      <Layout.Footer className='container'>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}
export default NoAsideLayout;

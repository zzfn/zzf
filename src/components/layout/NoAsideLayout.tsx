import { Layout } from '@zzf/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';

function NoAsideLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Center className='w-full'>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer className='container'>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}
export default NoAsideLayout;

import { Layout } from '@ootd/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import Aside from './default/Aside';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside className='hidden md:block sticky top-16'>
          <section className='sticky top-16 block'>
            <Aside />
          </section>
        </Layout.Aside>
        <Layout.Center className='w-full'>{children}</Layout.Center>
      </Layout.Content>
      <Layout.Footer className='container '>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

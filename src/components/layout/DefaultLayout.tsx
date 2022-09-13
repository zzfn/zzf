import { Layout } from '@dekopon/design';
import Header from './header';
import MobileHeader from './MobileHeader';
import Footer from './footer';
import type { ReactNode } from 'react';
import DefaultRight from './default/DefaultRight';
import DefaultLeft from './default/DefaultLeft';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
        <MobileHeader />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside className={'hidden md:block'}>
          <DefaultLeft />
        </Layout.Aside>
        <Layout.Center className='w-full'>{children}</Layout.Center>
        <Layout.Aside className={'hidden xl:block'}>
          <DefaultRight />
        </Layout.Aside>
      </Layout.Content>
      <Layout.Footer className='container '>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

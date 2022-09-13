import { Layout } from '@dekopon/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import Nav from '../article/nav';
import MobileHeader from './MobileHeader';
import DefaultLeft from "./default/DefaultLeft";
import DefaultRight from "./default/DefaultRight";

function DefaultLayout({ children, source }: { children: ReactNode; source: string }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
        <MobileHeader />
      </Layout.Header>
      <Layout.Content className='container'>
          <Layout.Aside className="hidden md:block">
              <Nav source={source} />
          </Layout.Aside>
          <Layout.Center className='w-full'>{children}</Layout.Center>
          <Layout.Aside className="hidden xl:block">
              <DefaultLeft />
              <DefaultRight />
          </Layout.Aside>
      </Layout.Content>
      <Layout.Footer className='container'>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

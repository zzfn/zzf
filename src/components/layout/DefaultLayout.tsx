import { Layout } from '@dekopon/design';
import Header from './header';
import Footer from './footer';
import type { ReactNode } from 'react';
import DefaultRight from './default/DefaultRight';
import DefaultLeft from './default/DefaultLeft';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className='min-h-screen'>
      <Layout.Header className='container'>
        <Header />
      </Layout.Header>
      <Layout.Content className='container'>
        <Layout.Aside className='hidden md:block sticky top-16'>
          <section className='sticky top-16'>
              <DefaultRight />
          </section>
          <section className='sticky top-16 block xl:hidden'>
            <DefaultLeft />
          </section>
        </Layout.Aside>
        <Layout.Center className='w-full'>{children}</Layout.Center>
        <Layout.Aside className='hidden xl:block'>
          <section className='sticky top-16'>
              <DefaultLeft />
          </section>
        </Layout.Aside>
      </Layout.Content>
      <Layout.Footer className='container '>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default DefaultLayout;

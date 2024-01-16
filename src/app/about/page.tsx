import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchData } from '../../models/api';



export const revalidate = 0;
export const metadata: Metadata = {
  title: 'About',
};

export default async function Page() {

  return (
    <>
      <div className='text-[var(--secondary-text)]'>
        <h3 className='text-primary font-bold text-xl my-3'>bio</h3>
        <p className='pl-3'>码农，软硬件爱好者，爱折腾</p>
        <h3 className='text-primary font-bold text-xl my-3'>connect</h3>
        <ul className='pl-3 list-disc'>
          <li>
            Blog 🏠 <span className='text-link-4'>zzfzzf.com</span>
          </li>
          <li>
            Email 📧 <span className='text-link-4'>me@ooxo.cc</span>
          </li>
          <li>
            GitHub 🕸 <span className='text-link-4'>zzfn</span>
          </li>
        </ul>
      </div>
    </>
  );
}

import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchData } from '../../models/api';
import { IconCheck } from '@oc/icon';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'About',
};

export default async function Page() {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Docker', level: 70 },
  ];

  const connects = [
    {
      icon: <IconCheck className='h-5 w-5' />,
      label: 'Blog',
      value: 'zzfzzf.com',
      link: 'https://zzfzzf.com',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <IconCheck className='h-5 w-5' />,
      label: 'Email',
      value: 'me@ooxo.cc',
      link: 'mailto:me@ooxo.cc',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <IconCheck className='h-5 w-5' />,
      label: 'GitHub',
      value: 'zzfn',
      link: 'https://github.com/zzfn',
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <div className='space-y-16 py-8 text-gray-700'>
      {/* Hero Section */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white'>
        <div className='relative z-10'>
          <h1 className='mb-4 text-4xl font-bold'>Hi, I&apos;m won 👋</h1>
          <p className='text-lg text-white/90'>码农 / 软硬件爱好者 / 爱折腾</p>
        </div>
        <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
      </div>

      {/* Skills Section */}
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>技能 & 工具</h2>
        <div className='grid gap-4 md:grid-cols-2'>
          {skills.map((skill) => (
            <div key={skill.name} className='space-y-2'>
              <div className='flex justify-between'>
                <span className='font-medium'>{skill.name}</span>
                <span className='text-sm text-gray-500'>{skill.level}%</span>
              </div>
              <div className='h-2 overflow-hidden rounded-full bg-gray-100'>
                <div
                  className='h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500'
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Section */}
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>联系方式</h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {connects.map((connect) => (
            <a
              key={connect.label}
              href={connect.link}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900'
            >
              <div className='flex items-center gap-4'>
                <div
                  className={classNames(
                    'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r',
                    connect.color,
                  )}
                >
                  {connect.icon}
                </div>
                <div>
                  <div className='text-sm text-gray-500'>{connect.label}</div>
                  <div className='font-medium'>{connect.value}</div>
                </div>
              </div>
              <div className='absolute inset-0 -z-10 bg-gradient-to-r opacity-0 blur-xl transition-opacity group-hover:opacity-50' />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
